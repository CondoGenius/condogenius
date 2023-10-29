using CondoGenius_Checks_Domain.Handler.Interfaces;
using CondoGenius_Checks_Domain.Repository.Interfaces;
using Global.Shared.Database;

namespace CondoGenius_Checks_Domain.Handler;

public class ChecksHandler : IChecksHandler
{
    private readonly IChecksRepository _repository;

    public ChecksHandler(IChecksRepository repository)
    {
        _repository = repository;
    }

    public async Task<int> DoCheckIn(int residentId)
    {
        var activeCheckins = await GetActiveCheckins();
        
        if (activeCheckins != null)
        {
            if (activeCheckins.ActiveCheckIns >= activeCheckins.Capacity)
            {
                throw new Exception("Quantidade máxima de pessoas atingida!");
            }
        }

        var checkIn = await _repository.GetCheckIn(residentId);

        if (checkIn != null)
        {
            throw new Exception("CheckIn já realizado!");
        }

        return await _repository.DoCheckIn(residentId);
    }

    public async Task<int> UndoCheckIn(int residentId)
    {
        return await _repository.UndoCheckIn(residentId);
    }

    public async Task<CheckIn?> GetCheckIn(int residentId)
    {
        return await _repository.GetCheckIn(residentId);
    }

    public async Task<List<CheckIn?>> GetCheckIns()
    {
        return await _repository.GetCheckIns();
    }

    private async Task<ActiveCheckins?> GetActiveCheckins()
    {
        return await _repository.GetActiveCheckins();
    }
}