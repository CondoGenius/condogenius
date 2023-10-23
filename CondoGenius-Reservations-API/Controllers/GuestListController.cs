using CondoGenius_Reservations_Domain.Handler.Interfaces;
using CondoGenius_Reservations_Domain.Requests;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;

namespace CondoGenius_Reservations_API.Controllers;

[ApiController]
[Route("guest")]
public class GuestListController : ControllerBase
{
    private readonly IGuestListHandler _handler;

    public GuestListController(IGuestListHandler handler)
    {
        _handler = handler;
    }

    // GET: /guest (Read)
    [HttpGet]
    public async Task<IActionResult> GetGuestLists()
    {
        try
        {
            return Ok(await _handler.GetAllGuests());
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // GET: /guest/reservation/1 (Read)
    [HttpGet("reservation/{id}")]
    public async Task<IActionResult> ListGuestListByReservation([FromRoute] int reservationId)
    {
        try
        {
            return Ok(await _handler.ListGuestListByReservation(reservationId));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // PUT: /guest
    [HttpPut]
    public async Task<IActionResult> UpdateGuestList([FromBody] CreateGuestListRequest request)
    {
        try
        {
            return Ok($"Inserido {await _handler.UpdateGuestList(request)} convidados");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    // POST: /guest (Create)
    [HttpPost]
    public async Task<IActionResult> CreateGuestList([FromBody] CreateGuestListRequest request)
    {
        try
        {
            var rowsAffected = await _handler.CreateGuest(request);

            return rowsAffected == 1
                ? Created("", "Registro criado com sucesso!")
                : BadRequest("Não foi possível criar o registro!");
        }
        catch (MySqlException e)
        {
            return BadRequest("Erro ao inserir convidado. Verifique se a reserva existe ou sua conexão.");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }


// DELETE: /guest/1 (Delete)
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteGuestList([FromRoute] int id)
    {
        try
        {
            var rowsAffected = await _handler.DeleteGuest(id);

            return rowsAffected == 1 ? Ok("Registro deletado com sucesso!") : NoContent();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}