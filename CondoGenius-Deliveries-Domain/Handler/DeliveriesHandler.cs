using CondoGenius_Deliveries_Domain.Handler.Interfaces;
using CondoGenius_Deliveries_Domain.Repository.Interfaces;
using CondoGenius_Deliveries_Domain.Requests;
using Global.Shared.Database.Entities;

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
        return await _repository.CreateDelivery(request);
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