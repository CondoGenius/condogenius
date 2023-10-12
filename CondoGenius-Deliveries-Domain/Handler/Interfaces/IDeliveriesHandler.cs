using CondoGenius_Deliveries_Domain.Requests;
using Global.Shared.Database.Entities;

namespace CondoGenius_Deliveries_Domain.Handler.Interfaces;

public interface IDeliveriesHandler
{
    public Task CreateDelivery(CreateDeliveryRequest request);
    public Task UpdateDelivery(int id, string status, string receivedBy);
    public Task<List<DeliveryControl>> ListDeliveries();
    public Task<DeliveryControl> ListDelivery(int id);
}