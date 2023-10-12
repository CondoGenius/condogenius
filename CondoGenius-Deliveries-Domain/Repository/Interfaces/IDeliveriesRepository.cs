using CondoGenius_Deliveries_Domain.Requests;
using Global.Shared.Database.Entities;

namespace CondoGenius_Deliveries_Domain.Repository.Interfaces;

public interface IDeliveriesRepository
{
    Task CreateDelivery(CreateDeliveryRequest request);
    Task UpdateDelivery(int id);
    Task<DeliveryControl> GetDelivery(int id);
    Task<List<DeliveryControl>> GetAllDeliveries();
    Task DeleteDelivery(int id);
}