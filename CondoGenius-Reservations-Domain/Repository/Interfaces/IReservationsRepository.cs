using CondoGenius_Reservations_Domain.Requests;
using Global.Shared.Database.Entities;

namespace CondoGenius_Reservations_Domain.Repository.Interfaces;

public interface IReservationsRepository
{
    public Task<int> CreateReservation(CreateReservationRequest request);
    public Task<int> UpdateReservation(int id, DateTime reservationDate);
    public Task<List<Reservation>> ListReservations();
    public Task<Reservation> ListReservation(int id);
    public Task<List<Reservation>> ListReservationsByResidence(int id);
    public Task<int> DeleteReservation(int id);
}