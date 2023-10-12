using CondoGenius_Deliveries_Domain.Repository.Interfaces;
using CondoGenius_Deliveries_Domain.Requests;
using CondoGenius_Deliveries_Infra.Queries.Interface;
using Dapper;
using Global.Shared;
using Global.Shared.Database.Entities;

namespace CondoGenius_Deliveries_Infra.Repository;

public class DeliveriesRepository : BaseRepository, IDeliveriesRepository
{
    private readonly IDeliveriesQueries _queries;

    public DeliveriesRepository(IDeliveriesQueries queries)
    {
        _queries = queries;
    }

    public async Task CreateDelivery(CreateDeliveryRequest request)
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();

            await conn.ExecuteAsync(_queries.CreateDelivery(), new
            {
                request.Status,
                request.ReceivedBy,
                request.ResidentId
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível criar a entrega. Erro: {ex.Message}");
            throw;
        }
    }

    public async Task UpdateDelivery(int id, string status, string receivedBy)
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();

            await conn.ExecuteAsync(_queries.UpdateDelivery(), new
            {
                Id = id,
                Status = status,
                ReceivedBy = receivedBy
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível criar a entrega. Erro: {ex.Message}");
            throw;
        }
    }

    public async Task<DeliveryControl> GetDelivery(int id)
    {
        await using var conn = GetConnection();

        await conn.OpenAsync();

        return await conn.QuerySingleAsync<DeliveryControl>(_queries.GetDelivery(), new
        {
            Id = id
        });
    }

    public async Task<List<DeliveryControl>> GetAllDeliveries()
    {
        await using var conn = GetConnection();

        await conn.OpenAsync();

        return (await conn.QueryAsync<DeliveryControl>(_queries.GetAllDeliveries())).ToList();
    }

    public Task DeleteDelivery(int id)
    {
        throw new NotImplementedException();
    }
}