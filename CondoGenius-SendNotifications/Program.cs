using CondoGenius_Checks_Domain.Handler;
using CondoGenius_Checks_Domain.Handler.Interfaces;
using CondoGenius_Checks_Domain.Repository.Interfaces;
using CondoGenius_Checks_Infra.Queries;
using CondoGenius_Checks_Infra.Queries.Interfaces;
using CondoGenius_Checks_Infra.Repository;
using CondoGenius_SendNotifications;
using CondoGenius_SendNotifications.Firebase;
using CondoGenius_SendNotifications.Firebase.Interface;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Hangfire;
using Hangfire.Dashboard;
using Hangfire.MemoryStorage;
using Microsoft.AspNetCore.Hosting;
using RabbitMQ.Client;

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureServices(services =>
    {
        services.AddScoped<IChecksHandler, ChecksHandler>();
        services.AddScoped<IChecksRepository, ChecksRepository>();
        services.AddScoped<IChecksQueries, ChecksQueries>();

        services.AddMemoryCache();
        
        JobStorage.Current = new MemoryStorage();

        services.AddHangfire(configuration => { configuration.UseRecommendedSerializerSettings().UseMemoryStorage(); });

        GlobalJobFilters.Filters.Add(new AutomaticRetryAttribute
        {
            Attempts = 3, DelaysInSeconds = new[] { 300 }
        });

        services.AddHangfireServer();

        services.AddHostedService<RabbitMQWorker>();
        services.AddSingleton<IFirebase, Firebase>();
    }).ConfigureWebHostDefaults(builder =>
    {
        
        builder.UseUrls("http://*:9000");
        builder.Configure(app =>
        {
            app.UseHangfireDashboard("/hangfire", new DashboardOptions()
            {
                Authorization = new[] { new MyAuthorizationFilter() }
            });
            
            var job = new CheckInVerificationJob(app.ApplicationServices.GetService<IChecksHandler>());
            job.VerifyCheckIns();
            
        });
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