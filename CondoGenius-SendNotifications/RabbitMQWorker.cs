using System.Text;
using CondoGenius_SendNotifications.Firebase.Interface;
using CondoGenius_SendNotifications.Models;
using FirebaseAdmin.Messaging;
using Newtonsoft.Json;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace CondoGenius_SendNotifications;

public class RabbitMQWorker : BackgroundService
{
    private readonly ILogger<RabbitMQWorker> _logger;
    private readonly IFirebase _firebase;

    public RabbitMQWorker(ILogger<RabbitMQWorker> logger, IFirebase firebase)
    {
        _logger = logger;
        _firebase = firebase;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        _logger.LogInformation("RabbitMQWorker running at: {time}", DateTimeOffset.Now);

        var factory = new ConnectionFactory() { HostName = "condogenius-rabbitmq-1" };
        
        var connection = factory.CreateConnection();
        var channel = connection.CreateModel();

        var consumer = new EventingBasicConsumer(channel);
        consumer.Received += async (model, ea) =>
        {
            Console.WriteLine("Mensagem recebida!");
            var body = ea.Body.ToArray();
            var message = JsonConvert.DeserializeObject<NotificationMessage>(Encoding.UTF8.GetString(body));

            try
            {
                await _firebase.SendNotification(message.Title, message.Body, message.DeviceToken);
            }
            catch (FirebaseMessagingException e)
            {
                Console.WriteLine("Token do usuário não é válido!");
            }
        };
        
        channel.BasicConsume(queue: "notifications",
            autoAck: true,
            consumer: consumer);
    }
}