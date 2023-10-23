using System.Globalization;
using CondoGenius_Reservations_Domain.Handler;
using CondoGenius_Reservations_Domain.Handler.Interfaces;
using CondoGenius_Reservations_Domain.Repository.Interfaces;
using CondoGenius_Reservations_Infra.Queries;
using CondoGenius_Reservations_Infra.Queries.Interfaces;
using CondoGenius_Reservations_Infra.Repository;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
    options.SerializerSettings.ContractResolver = new DefaultContractResolver
    {
        NamingStrategy = new SnakeCaseNamingStrategy
        {
            OverrideSpecifiedNames = true
        }
    };
});

var cultureInfo = new CultureInfo("pt-BR");
CultureInfo.DefaultThreadCurrentCulture = cultureInfo;
CultureInfo.DefaultThreadCurrentUICulture = cultureInfo;

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

//DEPENDENCY INJECTION
builder.Services.AddSingleton<IReservationsHandler, ReservationsHandler>();
builder.Services.AddSingleton<IReservationsRepository, ReservationsRepository>();
builder.Services.AddSingleton<IReservationsQueries, ReservationsQueries>();
builder.Services.AddSingleton<IGuestListHandler, GuestListHandler>();
builder.Services.AddSingleton<IGuestListRepository, GuestListRepository>();
builder.Services.AddSingleton<IGuestListQueries, GuestListQueries>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(c => c.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();