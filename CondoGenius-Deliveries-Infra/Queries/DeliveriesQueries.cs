using CondoGenius_Deliveries_Infra.Queries.Interface;

namespace CondoGenius_Deliveries_Infra.Queries;

public class DeliveriesQueries : IDeliveriesQueries
{
    public string CreateDelivery()
    {
        return File.ReadAllText("/src/SQLs/CreateDelivery.sql");
    }

    public string GetDelivery()
    {
        return File.ReadAllText("/src/SQLs/GetDelivery.sql");
    }

    public string GetAllDeliveries()
    {
        return File.ReadAllText("/src/SQLs/GetAllDeliveries.sql");
    }

    public string UpdateDelivery()
    {
        return File.ReadAllText("/src/SQLs/UpdateDelivery.sql");
    }

    public string DeleteDelivery()
    {
        return File.ReadAllText("/src/SQLs/DeleteDelivery.sql");
    }
}