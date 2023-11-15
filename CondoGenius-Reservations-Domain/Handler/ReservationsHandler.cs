using CondoGenius_Reservations_Domain.Handler.Interfaces;
using CondoGenius_Reservations_Domain.Repository.Interfaces;
using CondoGenius_Reservations_Domain.Requests;
using Global.Shared.Database.Entities;

namespace CondoGenius_Reservations_Domain.Handler;

public class ReservationsHandler : IReservationsHandler
{
    private readonly IReservationsRepository _repository;
    private readonly IGuestListHandler _guestListHandler;

    public ReservationsHandler(IReservationsRepository repository, IGuestListHandler guestListHandler)
    {
        _repository = repository;
        _guestListHandler = guestListHandler;
    }

    public async Task<int> CreateReservation(CreateReservationRequest request)
    {
        try
        {
            if(request.Date.Date < DateTime.UtcNow.AddHours(-3).Date)
            {
                throw new Exception("Não é possível criar uma reserva para uma data passada!");
            }

            var reservations = await _repository.ListReservationsDateByArea(request.AreaId);

            foreach (var reservation in reservations)
            {
                if (reservation.Day == request.Date.Day && reservation.Month == request.Date.Month &&
                    reservation.Year == request.Date.Year)
                {
                    throw new Exception("Já existe uma reserva para essa data!");
                }
            }

            return await _repository.CreateReservation(request);
        }
        catch (Exception ex)
        {
            Console.WriteLine("Erro no Handler da criação da reserva.");
            throw;
        }
    }

    public async Task<int> UpdateReservation(int id, DateTime newDate)
    {
        return await _repository.UpdateReservation(id, newDate);
    }

    public async Task<List<Reservation>> ListReservations()
    {
        var reservations = await _repository.ListReservations();

        foreach (var reservation in reservations)
        {
            reservation.GuestList = await _guestListHandler.ListGuestListByReservation(reservation.Id);
        }

        return reservations;
    }

    public async Task<Reservation> ListReservation(int id)
    {
        var reservation = await _repository.ListReservation(id);

        reservation.GuestList = await _guestListHandler.ListGuestListByReservation(reservation.Id);

        return reservation;
    }

    public async Task<List<Reservation>> ListReservationsByResidence(int id)
    {
        var reservations = await _repository.ListReservationsByResidence(id);

        foreach (var reservation in reservations)
        {
            reservation.GuestList = await _guestListHandler.ListGuestListByReservation(reservation.Id);
        }

        return reservations;
    }

    public async Task<int> DeleteReservation(int id)
    {
        await _guestListHandler.DeleteGuestByReservation(id);

        await _repository.DeleteReservation(id);

        return 1;
    }

    public async Task<List<CommonArea>> ListCommonAreas()
    {
        return await _repository.ListCommonAreas();
    }
}