namespace CondoGenius_Reservations_Infra.Queries.Interfaces;

public interface IReservationsQueries
{
    string CreateReservation();
    string UpdateReservation();
    string GetReservation();
    string ListReservations();
    string ListReservationsByResident();
    string ListReservationsByCommonArea();
    string DeleteReservation();
    string ListCommonAreas();
    string ListReservationsDateByArea();
}