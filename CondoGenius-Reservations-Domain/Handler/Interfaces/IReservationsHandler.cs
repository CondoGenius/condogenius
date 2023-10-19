using CondoGenius_Reservations_Domain.Requests;
using Global.Shared.Database.Entities;

namespace CondoGenius_Reservations_Domain.Handler.Interfaces;

public interface IReservationsHandler
{
    public Task<int> CreateReservation(CreateReservationRequest request);
    public Task<int> UpdateReservation(int id, DateTime newDate);
    public Task<List<Reservation>> ListReservations();
    public Task<Reservation> ListReservation(int id);
    public Task<List<Reservation>> ListReservationsByResidence(int id);
    public Task<int> DeleteReservation(int id);
    public Task<List<CommonArea>> ListCommonAreas();
}