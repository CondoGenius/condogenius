using CondoGenius_Reservations_Domain.Repository.Interfaces;
using CondoGenius_Reservations_Domain.Requests;
using CondoGenius_Reservations_Infra.Queries.Interfaces;
using Dapper;
using Global.Shared;
using Global.Shared.Database.Entities;
using MySql.Data.MySqlClient;

namespace CondoGenius_Reservations_Infra.Repository;

public class GuestListRepository : BaseRepository, IGuestListRepository
{
    private readonly IGuestListQueries _queries;

    public GuestListRepository(IGuestListQueries queries)
    {
        _queries = queries;
    }

    public async Task<int> CreateGuest(CreateGuestListRequest request)
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();

            return await conn.ExecuteAsync(_queries.CreateGuestList(),
                new { ReserveId = request.ReserveId, Name = request.Name, Cpf = request.Cpf });
        }
        catch (MySqlException)
        {
            Console.WriteLine($"Erro no banco de dados");
            throw;
        }
        catch (Exception)
        {
            Console.WriteLine($"Não foi possível criar o registro de convidado.");
            throw;
        }
    }

    public async Task<int> UpdateGuestList(CreateGuestListRequest request)
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();


            return await conn.ExecuteAsync(_queries.UpdateGuestList(), new
            {
                ReserveId = request.ReserveId,
                Name = request.Name,
                Cpf = request.Cpf
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível criar o registro de convidado. Erro: {ex.Message}");
            throw;
        }
    }

    public async Task<int> DeleteGuest(int id)
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();

            return await conn.ExecuteAsync(_queries.DeleteGuestList(), new
            {
                Id = id
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível excluir o registro de convidado. Erro: {ex.Message}");
            throw;
        }
    }

    public async Task<int> DeleteGuestByReservation(int reservationId)
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();

            return await conn.ExecuteAsync(_queries.DeleteGuestListByReservation(), new
            {
                Id = reservationId
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível excluir o registro de convidado. Erro: {ex.Message}");
            throw;
        }
    }

    public async Task<List<GuestList>> GetAllGuests()
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();

            return (await conn.QueryAsync<GuestList>(_queries.ListGuestLists())).AsList();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível obter a lista de convidados. Erro: {ex.Message}");
            throw;
        }
    }

    public async Task<List<GuestList>> ListGuestListByReservation(int id)
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();

            return (await conn.QueryAsync<GuestList>(_queries.GetGuestListByReservation(), new { ReserveId = id }))
                .ToList();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível obter o registro de convidado. Erro: {ex.Message}");
            throw;
        }
    }
}