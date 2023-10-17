using CondoGenius_Reservations_Domain.Repository.Interfaces;
using CondoGenius_Reservations_Domain.Requests;
using CondoGenius_Reservations_Infra.Queries.Interfaces;
using Dapper;
using Global.Shared;
using Global.Shared.Database.Entities;

namespace CondoGenius_Reservations_Infra.Repository;

public class ReservationsRepository : BaseRepository, IReservationsRepository
{
    private readonly IReservationsQueries _queries;

    public ReservationsRepository(IReservationsQueries queries)
    {
        _queries = queries;
    }

    public async Task<int> CreateReservation(CreateReservationRequest request)
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();

            return await conn.ExecuteAsync(_queries.CreateReservation(), new
            {
                CommonAreaId = request.AreaId,
                ResidentId = request.ResidentId,
                ReserveDate = request.Date,
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível criar a reserva. Erro: {ex.Message}");
            throw;
        }
    }

    public async Task<int> UpdateReservation(int id, DateTime reservationDate)
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();

            return await conn.ExecuteAsync(_queries.UpdateReservation(), new
            {
                Id = id,
                ReserveDate = reservationDate
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível atualizar a reserva. Erro: {ex.Message}");
            throw;
        }
    }

    public async Task<List<Reservation>> ListReservations()
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();

            return (await conn.QueryAsync<Reservation>(_queries.ListReservations())).ToList();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível obter as reservas. Erro: {ex.Message}");
            throw;
        }
    }

    public async Task<Reservation> ListReservation(int id)
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();

            return await conn.QuerySingleAsync<Reservation>(_queries.GetReservation(), new { Id = id });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível obter a reserva. Erro: {ex.Message}");
            throw;
        }
    }

    public async Task<List<Reservation>> ListReservationsByResidence(int id)
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();

            return (await conn.QueryAsync<Reservation>(_queries.ListReservationsByResident(),
                new
                {
                    Id = id
                })).ToList();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível obter as reservas. Erro: {ex.Message}");
            throw;
        }
    }

    public async Task<int> DeleteReservation(int id)
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();

            return await conn.ExecuteAsync(_queries.DeleteReservation(), new
            {
                Id = id
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível excluir a reserva. Erro: {ex.Message}");
            throw;
        }
    }

    public async Task<List<CommonArea>> ListCommonAreas()
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();

            return (await conn.QueryAsync<CommonArea>(_queries.ListCommonAreas())).ToList();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível obter as áreas comuns. Erro: {ex.Message}");
            throw;
        }
    }
}