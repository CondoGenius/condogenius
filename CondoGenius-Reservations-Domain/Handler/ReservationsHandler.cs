using CondoGenius_Reservations_Domain.Handler.Interfaces;
using CondoGenius_Reservations_Domain.Repository.Interfaces;
using CondoGenius_Reservations_Domain.Requests;
using Global.Shared.Database.Entities;

namespace CondoGenius_Reservations_Domain.Handler;

public class ReservationsHandler : IReservationsHandler
{
    private readonly IReservationsRepository _repository;

    public ReservationsHandler(IReservationsRepository repository)
    {
        _repository = repository;
    }

    public async Task<int> CreateReservation(CreateReservationRequest request)
    {
        return await _repository.CreateReservation(request);
    }

    public async Task<int> UpdateReservation(int id)
    {
        return await _repository.UpdateReservation(id, DateTime.Now);
    }

    public async Task<List<Reservation>> ListReservations()
    {
        return await _repository.ListReservations();
    }

    public async Task<Reservation> ListReservation(int id)
    {
        return await _repository.ListReservation(id);
    }

    public async Task<List<Reservation>> ListReservationsByResidence(int id)
    {
        return await _repository.ListReservationsByResidence(id);
    }

    public async Task<int> DeleteReservation(int id)
    {
        return await _repository.DeleteReservation(id);
    }
}