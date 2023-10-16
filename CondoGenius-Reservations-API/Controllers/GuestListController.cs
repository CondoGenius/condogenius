using CondoGenius_Reservations_Domain.Handler.Interfaces;
using CondoGenius_Reservations_Domain.Requests;
using Microsoft.AspNetCore.Mvc;

namespace CondoGenius_Reservations_API.Controllers;

[ApiController]
[Route("api/guestlist")]
public class GuestListController : ControllerBase
{
    private readonly IGuestListHandler _handler;
    
    public GuestListController(IGuestListHandler handler)
    {
        _handler = handler;
    }
    
    // GET: api/guestlists (Read)
    [HttpGet]
    public async Task<IActionResult> GetGuestLists()
    {
        return Ok(await _handler.GetAllGuests());
    }

// GET: api/guestlists/reservation/1 (Read)
    [HttpGet("reservation/{id}")]
    public async Task<IActionResult> ListGuestListByReservation([FromRoute] int reservationId)
    {
        return Ok(await _handler.ListGuestListByReservation(reservationId));
    }

// POST: api/guestlists (Create)
    [HttpPost]
    public async Task<IActionResult> CreateGuestList([FromBody] CreateGuestListRequest request)
    {
        var rowsAffected = await _handler.CreateGuest(request);

        return rowsAffected == 1 ? Created("", "Registro criado com sucesso!") : BadRequest("Não foi possível criar o registro!");
    }
    

// DELETE: api/guestlists/1 (Delete)
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGuestList([FromRoute] int id)
    {
        var rowsAffected = await _handler.DeleteGuest(id);
    
        return rowsAffected == 1 ? Ok("Registro deletado com sucesso!") : NoContent();
    }
}