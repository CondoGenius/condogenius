using CondoGenius_Reservations_Domain.Requests;
using Global.Shared.Database.Entities;

namespace CondoGenius_Reservations_Domain.Handler.Interfaces;

public interface IGuestListHandler
{
    Task<int> CreateGuest(CreateGuestListRequest request);
    Task<int> UpdateGuestList(CreateGuestListRequest request);
    Task<int> DeleteGuest(int id);
    Task<List<GuestList>> GetAllGuests();
    Task<List<GuestList>> ListGuestListByReservation(int id);
}