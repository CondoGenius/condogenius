using CondoGenius_Deliveries_Domain.Requests;
using Global.Shared.Database.Entities;

namespace CondoGenius_Deliveries_Domain.Handler.Interfaces;

public interface IDeliveriesHandler
{
    public Task<int> CreateDelivery(CreateDeliveryRequest request);
    public Task<int> UpdateDelivery(int id);
    public Task<List<DeliveryControl>> ListDeliveries();
    public Task<DeliveryControl> ListDelivery(int id);
    public Task<List<DeliveryControl>> ListDeliveriesByResidence(int id);
    public Task<int> DeleteDelivery(int id);
}