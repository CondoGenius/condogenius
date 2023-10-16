namespace CondoGenius_Reservations_Infra.Queries.Interfaces;

public interface IGuestListQueries
{
    string CreateGuestList();
    string UpdateGuestList();
    string GetGuestListByReservation();
    string ListGuestLists();
    string DeleteGuestList();
}