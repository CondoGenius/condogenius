using Global.Shared.Database;

namespace CondoGenius_Checks_Domain.Handler.Interfaces;

public interface IChecksHandler
{
    Task<int> DoCheckIn(int residentId);
    Task<int> UndoCheckIn(int residentId);
    Task<CheckIn?> GetCheckIn(int residentId);
}