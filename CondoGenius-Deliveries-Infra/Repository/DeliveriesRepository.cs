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

    public async Task<int> CreateDelivery(CreateDeliveryRequest request)
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();

            return await conn.ExecuteAsync(_queries.CreateDelivery(), new
            {
                Status = "Na portaria",
                request.UserId,
                request.ResidenceId
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível criar a entrega. Erro: {ex.Message}");
            throw;
        }
    }

    public async Task<int> UpdateDelivery(int id)
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();

            return await conn.ExecuteAsync(_queries.UpdateDelivery(), new
            {
                Id = id,
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível atualizar a entrega. Erro: {ex.Message}");
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

    public async Task<List<DeliveryControl>> GetDeliveriesByResidence(int id)
    {
        await using var conn = GetConnection();
        
        await conn.OpenAsync();

        return (await conn.QueryAsync<DeliveryControl>(_queries.GetDeliveryByResidence(), new
        {
            ResidenceId = id
        })).ToList();

    }

    public async Task<int> DeleteDelivery(int id)
    {
        await using var conn = GetConnection();
        
        await conn.OpenAsync();

        return await conn.ExecuteAsync(_queries.DeleteDelivery(), new
        {
            Id = id
        });
    }
}