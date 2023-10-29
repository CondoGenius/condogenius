namespace CondoGenius_Checks_Infra.Queries.Interfaces;

public interface IChecksQueries
{
    string DoCheckIn();
    string UndoCheckIn();
    string CountActiveCheckIns();
    string ListCheckInByResident();
    string GetCheckIns();
}