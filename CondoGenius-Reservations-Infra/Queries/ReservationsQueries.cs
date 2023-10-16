using CondoGenius_Reservations_Infra.Queries.Interfaces;

namespace CondoGenius_Reservations_Infra.Queries;

public class ReservationsQueries : IReservationsQueries
{
    public string CreateReservation()
    {
        return File.ReadAllText("/src/SQLs/CreateReservation.sql");
    }

    public string UpdateReservation()
    {
        return File.ReadAllText("/src/SQLs/UpdateReservation.sql");
    }

    public string GetReservation()
    {
        return File.ReadAllText("/src/SQLs/GetReservation.sql");
    }

    public string ListReservations()
    {
        return File.ReadAllText("/src/SQLs/GetAllReservations.sql");
    }

    public string ListReservationsByResident()
    {
        return File.ReadAllText("/src/SQLs/ListReservationsByResident.sql");
    }

    public string ListReservationsByCommonArea()
    {
        return File.ReadAllText("/src/SQLs/ListReservationsByCommonArea.sql");
    }

    public string DeleteReservation()
    {
        return File.ReadAllText("/src/SQLs/DeleteReservation.sql");
    }
}