using CondoGenius_Reservations_Domain.Handler.Interfaces;
using CondoGenius_Reservations_Domain.Repository.Interfaces;
using CondoGenius_Reservations_Domain.Requests;
using Global.Shared.Database.Entities;

namespace CondoGenius_Reservations_Domain.Handler;

public class GuestListHandler : IGuestListHandler
{
    private readonly IGuestListRepository _repository;

    public GuestListHandler(IGuestListRepository repository)
    {
        _repository = repository;
    }
    
    public async Task<int> CreateGuest(CreateGuestListRequest request)
    {
        List<GuestList> guests = 
            await ListGuestListByReservation(request.ReserveId);
        
        if(guests != null && guests.Any(c => c.Cpf == request.Cpf))
            throw new Exception("CPF já cadastrado para essa reserva");
        
        return await _repository.CreateGuest(request);
    }

    public async Task<int> UpdateGuestList(CreateGuestListRequest request)
    {
        return await _repository.UpdateGuestList(request);
    }

    public async Task<int> DeleteGuest(int id)
    {
        return await _repository.DeleteGuest(id);
    }

    public async Task<int> DeleteGuestByReservation(int reservationId)
    {
        return await _repository.DeleteGuestByReservation(reservationId);
    }

    public async Task<List<GuestList>> GetAllGuests()
    {
        return await _repository.GetAllGuests();
    }

    public async Task<List<GuestList>> ListGuestListByReservation(int id)
    {
        return await _repository.ListGuestListByReservation(id);
    }
}