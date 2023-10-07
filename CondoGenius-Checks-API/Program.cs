using CondoGenius_Checks_Domain.Handler;
using CondoGenius_Checks_Domain.Handler.Interfaces;
using CondoGenius_Checks_Domain.Repository.Interfaces;
using CondoGenius_Checks_Infra.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//DEPENDENCY INJECTION
builder.Services.AddSingleton<IChecksHandler, ChecksHandler>();
builder.Services.AddSingleton<IChecksRepository, ChecksRepository>();

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