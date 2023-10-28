using System.Globalization;
using CondoGenius_Checks_Domain.Handler;
using CondoGenius_Checks_Domain.Handler.Interfaces;
using CondoGenius_Checks_Domain.Repository.Interfaces;
using CondoGenius_Checks_Infra.Queries;
using CondoGenius_Checks_Infra.Queries.Interfaces;
using CondoGenius_Checks_Infra.Repository;
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

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

//DEPENDENCY INJECTION
builder.Services.AddSingleton<IChecksHandler, ChecksHandler>();
builder.Services.AddSingleton<IChecksRepository, ChecksRepository>();
builder.Services.AddSingleton<IChecksQueries, ChecksQueries>();

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