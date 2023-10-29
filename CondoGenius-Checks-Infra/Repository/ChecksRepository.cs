using CondoGenius_Checks_Domain.Repository.Interfaces;
using CondoGenius_Checks_Infra.Queries.Interfaces;
using Dapper;
using Global.Shared;
using Global.Shared.Database;

namespace CondoGenius_Checks_Infra.Repository;

public class ChecksRepository : BaseRepository, IChecksRepository
{
    private readonly IChecksQueries _queries;

    public ChecksRepository(IChecksQueries queries)
    {
        _queries = queries;
    }

    public async Task<int> DoCheckIn(int residentId)
    {
        await using var conn = GetConnection();

        await conn.OpenAsync();

        return await conn.ExecuteAsync(_queries.DoCheckIn(), new
        {
            ResidentId = residentId
        });
    }

    public async Task<int> UndoCheckIn(int residentId)
    {
        await using var conn = GetConnection();

        await conn.OpenAsync();

        return await conn.ExecuteAsync(_queries.UndoCheckIn(), new
        {
            ResidentId = residentId
        });
    }

    public async Task<ActiveCheckins?> GetActiveCheckins()
    {
        await using var conn = GetConnection();

        await conn.OpenAsync();

        return await conn.QuerySingleOrDefaultAsync<ActiveCheckins>(_queries.CountActiveCheckIns());
    }

    public async Task<CheckIn?> GetCheckIn(int residentId)
    {
        await using var conn = GetConnection();

        await conn.OpenAsync();

        return await conn.QuerySingleOrDefaultAsync<CheckIn?>(_queries.ListCheckInByResident(), new
        {
            ResidentId = residentId
        });
    }

    public async Task<List<CheckIn?>> GetCheckIns()
    {
        await using var conn = GetConnection();

        await conn.OpenAsync();

        return (await conn.QueryAsync<CheckIn?>(_queries.GetCheckIns())).ToList();
    }
}