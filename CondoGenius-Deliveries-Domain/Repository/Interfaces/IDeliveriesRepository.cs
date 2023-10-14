using CondoGenius_Deliveries_Domain.Requests;
using Global.Shared.Database.Entities;

namespace CondoGenius_Deliveries_Domain.Repository.Interfaces;

public interface IDeliveriesRepository
{
    Task<int> CreateDelivery(CreateDeliveryRequest request);
    Task<int> UpdateDelivery(int id);
    Task<DeliveryControl> GetDelivery(int id);
    Task<List<DeliveryControl>> GetAllDeliveries();
    Task<List<DeliveryControl>> GetDeliveriesByResidence(int id);
    Task<int> DeleteDelivery(int id);
}