using CondoGenius_Checks_Infra.Queries.Interfaces;

namespace CondoGenius_Checks_Infra.Queries;

public class ChecksQueries : IChecksQueries
{
    public string DoCheckIn()
    {
        return File.ReadAllText("/src/SQLs/DoCheckIn.sql");
    }

    public string UndoCheckIn()
    {
        return File.ReadAllText("/src/SQLs/UndoCheckIn.sql");
    }

    public string CountActiveCheckIns()
    {
        return File.ReadAllText("/src/SQLs/CountActiveCheckIns.sql");
    }

    public string ListCheckInByResident()
    {
        return File.ReadAllText("/src/SQLs/ListCheckInByResident.sql");
    }
}