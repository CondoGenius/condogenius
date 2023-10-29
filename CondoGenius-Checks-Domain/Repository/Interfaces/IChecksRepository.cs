using Global.Shared.Database;

namespace CondoGenius_Checks_Domain.Repository.Interfaces;

public interface IChecksRepository
{
    Task<int> DoCheckIn(int residentId);
    Task<int> UndoCheckIn(int residentId);
    Task<ActiveCheckins?> GetActiveCheckins();
    Task<CheckIn?> GetCheckIn(int residentId);
    Task<List<CheckIn?>> GetCheckIns();
}