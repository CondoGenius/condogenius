using System.Text;
using CondoGenius_Deliveries_Domain.Handler.Interfaces;
using CondoGenius_Deliveries_Domain.Repository.Interfaces;
using CondoGenius_Deliveries_Domain.Requests;
using Flurl.Http;
using Global.Shared.Database;
using Global.Shared.Database.Entities;
using Newtonsoft.Json;
using RabbitMQ.Client;

namespace CondoGenius_Deliveries_Domain.Handler;

public class DeliveriesHandler : IDeliveriesHandler
{
    private readonly IDeliveriesRepository _repository;

    public DeliveriesHandler(IDeliveriesRepository repository)
    {
        _repository = repository;
    }

    public async Task<int> CreateDelivery(CreateDeliveryRequest request)
    {
        var createdRows = await _repository.CreateDelivery(request);

        var residentUrl = $"http://residents:7008/api/residents/residence/{request.ResidenceId}";
        var residents = await residentUrl.GetJsonAsync<List<Resident>>();
        
        try
        {
            foreach (var resident in residents)
            {
                Console.WriteLine($"Mandando mensagem para fila..");
                
                var factory = new ConnectionFactory { HostName = "condogenius-rabbitmq-1" };
                using var connection = factory.CreateConnection();
                using var channel = connection.CreateModel();
                
                var message = new
                {
                    Title = "Psiu! Você recebeu uma encomenda",
                    Body = "Retire a qualquer momento na portaria.",
                    DeviceToken = resident.DeviceToken
                };
                var body = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(message));

                channel.BasicPublish(exchange: "notifications",
                    routingKey: string.Empty,
                    basicProperties: null,
                    body: body);
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("Erro ao enviar notificação. Erro: " + e);
        }

        return createdRows;
    }
    public async Task<List<DeliveryControl>> ListDeliveries()
    {
        return await _repository.GetAllDeliveries();
    }

    public async Task<DeliveryControl> ListDelivery(int id)
    {
        return await _repository.GetDelivery(id);
    }

    public async Task<List<DeliveryControl>> ListDeliveriesByResidence(int id)
    {
        return await _repository.GetDeliveriesByResidence(id);
    }

    public async Task<int> DeleteDelivery(int id)
    {
        return await _repository.DeleteDelivery(id);
    }

    public async Task<int> UpdateDelivery(int id)
    {
        return await _repository.UpdateDelivery(id);
    }

}