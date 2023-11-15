using System.Text;
using Flurl.Http;
using Global.Shared.Database;
using Global.Shared.Database.Entities;
using Hangfire;
using Newtonsoft.Json;
using RabbitMQ.Client;

namespace CondoGenius_SendNotifications;

public class MeetingsVerificationJob
{
    public void RememberMeetings()
    {
        RecurringJob.AddOrUpdate(
            "Lembrete de Reuniões",
            () => NotifyMeetings(),
            "0 10 * * *",
            TimeZoneInfo.Local);
    }

    public async Task NotifyMeetings()
    {
        var meetingsUrl = $"http://meetings:7009/api/meetings";
        var meetings = await meetingsUrl.GetJsonAsync<List<Meeting>>();

        foreach (var meeting in meetings)
        {
            if (meeting.Date.Day == DateTime.UtcNow.Day)
            {
                Console.WriteLine($"Mandando mensagem para fila..");

                var factory = new ConnectionFactory { HostName = "condogenius-rabbitmq-1" };
                using var connection = factory.CreateConnection();
                using var channel = connection.CreateModel();

                var message = new
                {
                    Title = "Você tem uma reunião hoje!",
                    Body = $"Nâo se esqueça da reunião marcada para {meeting.Hour}",
                    DeviceToken = "all"
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