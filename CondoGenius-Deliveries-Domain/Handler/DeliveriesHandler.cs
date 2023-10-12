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

    public async Task CreateDelivery(CreateDeliveryRequest request)
    {
        await _repository.CreateDelivery(request);
    }
    public async Task<List<DeliveryControl>> ListDeliveries()
    {
        return await _repository.GetAllDeliveries();
    }

    public async Task<DeliveryControl> ListDelivery(int id)
    {
        return await _repository.GetDelivery(id);
    }

    public async Task UpdateDelivery(int id, string status, string receivedBy)
    {
        await _repository.UpdateDelivery(id, status, receivedBy);
    }

}