using System.Text;
using CondoGenius_Reservations_Domain.Handler.Interfaces;
using Hangfire;
using Newtonsoft.Json;
using RabbitMQ.Client;

namespace CondoGenius_SendNotifications;

public class ReservationVerificationJob
{
    private readonly IReservationsHandler _handler;

    public ReservationVerificationJob(IReservationsHandler handler)
    {
        _handler = handler;
    }

    public void RememberReservations()
    {
        RecurringJob.AddOrUpdate(
            "Lembrete de Reservas",
            () => NotifyReservations(),
            "0 20 * * *",
            //Cron.Minutely,
            TimeZoneInfo.Local);
    }

    public async Task NotifyReservations()
    {
        var reservations = await _handler.ListReservations();

        if (reservations.Count > 0)
        {
            foreach (var reservation in reservations)
            {
                Console.WriteLine($"{reservation?.ReserveDate.Day}/{reservation?.ReserveDate.Month}");
                Console.WriteLine($"{DateTime.UtcNow.AddHours(-3).AddDays(1).Day}/{DateTime.UtcNow.AddHours(-3).AddDays(1).Month}");
                
                if ($"{reservation?.ReserveDate.Day}/{reservation?.ReserveDate.Month}" ==
                    $"{DateTime.UtcNow.AddHours(-3).AddDays(1).Day}/{DateTime.UtcNow.AddHours(-3).AddDays(1).Month}")
                {
                    
                    Console.WriteLine($"Mandando mensagem para fila..");

                    var factory = new ConnectionFactory { HostName = "condogenius-rabbitmq-1" };
                    using var connection = factory.CreateConnection();
                    using var channel = connection.CreateModel();

                    var message = new
                    {
                        Title = "Eba! Você tem uma reserva amanhã!",
                        Body = $"Nâo se esqueça da sua reserva em {reservation.CommonAreaName}",
                        DeviceToken = reservation?.DeviceToken
                    };
                    
                    var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message));

                    channel.BasicPublish(exchange: "notifications",
                        routingKey: string.Empty,
                        basicProperties: null,
                        body: body);
                }
            }
        }
    }
}