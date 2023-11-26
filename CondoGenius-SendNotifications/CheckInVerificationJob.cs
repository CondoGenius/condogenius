using System.Text;
using CondoGenius_Checks_Domain.Handler.Interfaces;
using Hangfire;
using Newtonsoft.Json;
using RabbitMQ.Client;

namespace CondoGenius_SendNotifications;

public class CheckInVerificationJob
{
    private readonly IChecksHandler _handler;

    public CheckInVerificationJob(IChecksHandler handler)
    {
        _handler = handler;
    }

    public void VerifyCheckIns()
    {
        RecurringJob.AddOrUpdate(
            "Verificação de CheckIn",
            () => GetAndDeleteExpiredCheckIns(),
            Cron.Minutely,
            TimeZoneInfo.Utc);
    }

    public async Task GetAndDeleteExpiredCheckIns()
    {
        var checkins = await _handler.GetCheckIns();

        if (checkins.Count > 0)
        {
            foreach (var checkin in checkins)
            {
                if (checkin?.CreatedAt.AddMinutes(2) <= DateTime.UtcNow.AddHours(-3))
                {
                    await _handler.UndoCheckIn(checkin.ResidentId);

                    Console.WriteLine($"Mandando mensagem para fila..");

                    var factory = new ConnectionFactory { HostName = "condogenius-rabbitmq-1" };
                    using var connection = factory.CreateConnection();
                    using var channel = connection.CreateModel();

                    var message = new
                    {
                        Title = "Seu check-in expirou",
                        Body = "Você pode fazer check-in novamente a qualquer momento.",
                        DeviceToken = checkin?.DeviceToken
                    };
                    var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message));

                    channel.BasicPublish(exchange: "notifications",
                        routingKey: string.Empty,
                        basicProperties: null,
                        body: body);
                }
                // else if (checkin?.CreatedAt.AddMinutes(1) <= DateTime.Now.AddMinutes(5))
                // {
                //     var factory = new ConnectionFactory { HostName = "condogenius-rabbitmq-1" };
                //     using var connection = factory.CreateConnection();
                //     using var channel = connection.CreateModel();
                //
                //     var message = new
                //     {
                //         Title = "Seu CheckIn expirará em breve",
                //         Body = "Daqui cerca de 5 minutos seu CheckIn expirará.",
                //         DeviceToken = checkin?.DeviceToken
                //     };
                //     var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message));
                //
                //     channel.BasicPublish(exchange: "notifications",
                //         routingKey: string.Empty,
                //         basicProperties: null,
                //         body: body);
                // }
            }
        }
    }
}