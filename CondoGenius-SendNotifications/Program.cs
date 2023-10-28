using CondoGenius_SendNotifications;
using CondoGenius_SendNotifications.Firebase;
using CondoGenius_SendNotifications.Firebase.Interface;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using RabbitMQ.Client;

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureServices(services =>
    {
        services.AddHostedService<RabbitMQWorker>();
        services.AddSingleton<IFirebase, Firebase>();
    })
    .Build();

var factory = new ConnectionFactory() { HostName = "condogenius-rabbitmq-1" };
using var connection = factory.CreateConnection();
using var channel = connection.CreateModel();

channel.ExchangeDeclare("notifications", ExchangeType.Fanout);

channel.QueueDeclare(queue: "notifications",
    durable: true,
    exclusive: false,
    autoDelete: false,
    arguments: null);

channel.QueueBind(queue: "notifications",
    exchange: "notifications",
    routingKey: string.Empty);

connection.Close();

FirebaseApp.Create(new AppOptions
{
    Credential = GoogleCredential.FromFile("/condogenius-firebaseadmin-key.json"),
    ProjectId = "780347999304",
});

host.Run();