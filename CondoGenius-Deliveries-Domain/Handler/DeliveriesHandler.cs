using CondoGenius_Deliveries_Domain.Handler.Interfaces;
using CondoGenius_Deliveries_Domain.Repository.Interfaces;
using CondoGenius_Deliveries_Domain.Requests;
using CondoGenius_Firebase;
using Flurl.Http;
using Global.Shared.Database;
using Global.Shared.Database.Entities;

namespace CondoGenius_Deliveries_Domain.Handler;

public class DeliveriesHandler : IDeliveriesHandler
{
    private readonly IDeliveriesRepository _repository;
    private readonly IFirebase _firebase;

    public DeliveriesHandler(IDeliveriesRepository repository, IFirebase firebase)
    {
        _repository = repository;
        _firebase = firebase;
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
                Console.WriteLine($"Token: {resident.DeviceToken}");
                await _firebase.SendNotification("Psiu! Sua encomenda chegou", 
                    "Sua encomenda foi recebida na portaria", resident.DeviceToken);
                
                Console.WriteLine("Notificação enviada!");
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