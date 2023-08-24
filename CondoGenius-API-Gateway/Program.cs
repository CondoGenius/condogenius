using CondoGenius_API_Gateway;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;

var builder = WebHost.CreateDefaultBuilder(args).
    ConfigureAppConfiguration(ic => ic.AddJsonFile("configuration.json"))
    .UseStartup<Startup>();

var app = builder.Build();

app.Run();