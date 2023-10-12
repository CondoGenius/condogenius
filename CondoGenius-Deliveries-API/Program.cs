using CondoGenius_Deliveries_Domain.Handler;
using CondoGenius_Deliveries_Domain.Handler.Interfaces;
using CondoGenius_Deliveries_Domain.Repository.Interfaces;
using CondoGenius_Deliveries_Infra.Queries;
using CondoGenius_Deliveries_Infra.Queries.Interface;
using CondoGenius_Deliveries_Infra.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//DEPENDENCY INJECTION
builder.Services.AddSingleton<IDeliveriesHandler, DeliveriesHandler>();
builder.Services.AddSingleton<IDeliveriesRepository, DeliveriesRepository>();
builder.Services.AddSingleton<IDeliveriesQueries, DeliveriesQueries>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();