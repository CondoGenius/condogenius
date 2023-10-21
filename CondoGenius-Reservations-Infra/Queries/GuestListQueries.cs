using CondoGenius_Reservations_Infra.Queries.Interfaces;

namespace CondoGenius_Reservations_Infra.Queries;

public class GuestListQueries : IGuestListQueries
{
    public string CreateGuestList()
    {
        return File.ReadAllText("/src/SQLs/CreateGuestList.sql");
    }

    public string UpdateGuestList()
    {
        return File.ReadAllText("/src/SQLs/UpdateGuestList.sql");
    }

    public string GetGuestListByReservation()
    {
        return File.ReadAllText("/src/SQLs/ListGuestListByReservation.sql");
    }

    public string ListGuestLists()
    {
        return File.ReadAllText("/src/SQLs/GetAllGuestList.sql");
    }

    public string DeleteGuestList()
    {
        return File.ReadAllText("/src/SQLs/DeleteGuestList.sql");
    }

    public string DeleteGuestListByReservation()
    {
        return File.ReadAllText("/src/SQLs/DeleteGuestListByReservation.sql");
    }
}