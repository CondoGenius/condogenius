using CondoGenius_Reservations_Domain.Repository.Interfaces;
using CondoGenius_Reservations_Domain.Requests;
using CondoGenius_Reservations_Infra.Queries.Interfaces;
using Dapper;
using Global.Shared;
using Global.Shared.Database.Entities;

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

            return await conn.ExecuteAsync(_queries.CreateGuestList(), new { ReserveId = request.ReserveId });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível criar o registro de convidado. Erro: {ex.Message}");
            throw;
        }
    }

    public async Task<int> UpdateGuestList(CreateGuestListRequest request)
    {
        try
        {
            int i = 0;

            await using var conn = GetConnection();

            await conn.OpenAsync();

            if (request.GuestList != null)
            {
                foreach (var guest in request.GuestList)
                {
                    await conn.ExecuteAsync(_queries.UpdateGuestList(), new
                    {
                        ReserveId = request.ReserveId,
                        Name = guest.Name,
                        Phone = guest.Phone,
                        Cpf = guest.Cpf
                    });

                    i++;
                }
            }
            else
            {
                throw new Exception("Lista de convidados vazia!");
            }

            return i;
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

            return (await conn.QueryAsync<GuestList>(_queries.GetGuestListByReservation(), new { ReserveId = id })).ToList();
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Não foi possível obter o registro de convidado. Erro: {ex.Message}");
            throw;
        }
    }
}