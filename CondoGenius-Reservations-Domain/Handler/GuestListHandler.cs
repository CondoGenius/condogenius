using CondoGenius_Reservations_Domain.Handler.Interfaces;
using CondoGenius_Reservations_Domain.Requests;
using Global.Shared.Database.Entities;

namespace CondoGenius_Reservations_Domain.Handler;

public class GuestListHandler : IGuestListHandler
{
    public async Task<int> CreateGuest(CreateGuestListRequest request)
    {
        throw new NotImplementedException();
    }

    public async Task<int> DeleteGuest(int id)
    {
        throw new NotImplementedException();
    }

    public async Task<List<GuestList>> GetAllGuests()
    {
        throw new NotImplementedException();
    }

    public async Task<List<GuestList>> ListGuestListByReservation(int id)
    {
        throw new NotImplementedException();
    }
}