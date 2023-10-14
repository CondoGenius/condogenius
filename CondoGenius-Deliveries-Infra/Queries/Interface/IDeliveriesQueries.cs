namespace CondoGenius_Deliveries_Infra.Queries.Interface;

public interface IDeliveriesQueries
{
    public string CreateDelivery();
    public string GetDelivery();
    public string GetAllDeliveries();
    public string GetDeliveryByResidence();
    public string UpdateDelivery();
    public string DeleteDelivery();
}