using CondoGenius_Complaints_Domain.Handler;
using CondoGenius_Complaints_Domain.Handler.Interfaces;
using CondoGenius_Complaints_Domain.Repository.Interfaces;
using CondoGenius_Complaints_Infra.Queries;
using CondoGenius_Complaints_Infra.Queries.Interface;
using CondoGenius_Complaints_Infra.Repository;
using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ContractResolver = new DefaultContractResolver
    {
        NamingStrategy = new SnakeCaseNamingStrategy
        {
            OverrideSpecifiedNames = true
        }
    };
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

//DEPENDENCY INJECTION
builder.Services.AddSingleton<IComplaintsHandler, ComplaintsHandler>();
builder.Services.AddSingleton<IComplaintsRepository, ComplaintsRepository>();
builder.Services.AddSingleton<IComplaintsQueries, ComplaintsQueries>();

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