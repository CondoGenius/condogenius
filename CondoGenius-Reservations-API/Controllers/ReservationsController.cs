using CondoGenius_Reservations_Domain.Handler.Interfaces;
using CondoGenius_Reservations_Domain.Requests;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CondoGenius_Reservations_API.Controllers;

[ApiController]
[Route("/")]
public class ReservationsController : ControllerBase
{
    private readonly IReservationsHandler _handler;

    public ReservationsController(IReservationsHandler handler)
    {
        _handler = handler;
    }

    [HttpGet("areas")]
    public async Task<IActionResult> GetCommonAreas()
    {
        try
        {
            return Ok(await _handler.ListCommonAreas());
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // GET: api/reservations (Read)
    [HttpGet]
    public async Task<IActionResult> GetReservations()
    {
        try
        {
            return Ok(await _handler.ListReservations());
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // GET: api/reservations/1 (Read)
    [HttpGet("{id}")]
    public async Task<IActionResult> GetReservation([FromRoute] int id)
    {
        try
        {
            return Ok(await _handler.ListReservation(id));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // GET: api/reservations/resident/1 (Read)
    [HttpGet("resident/{id}")]
    public async Task<IActionResult> GetReservationByResidence([FromRoute] int id)
    {
        try
        {
            return Ok(await _handler.ListReservationsByResidence(id));
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // POST: api/reservations (Create)
    [HttpPost]
    public async Task<IActionResult> CreateReservation([FromBody] CreateReservationRequest request)
    {
        try
        {
            var rowsAffected = await _handler.CreateReservation(request);

            return rowsAffected == 1
                ? Created("", "Registro criado com sucesso!")
                : BadRequest("Não foi possível criar o registro!");
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }

    // DELETE: api/reservations/1 (Delete)
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteReservation([FromRoute] int id)
    {
        try
        {
            var rowsAffected = await _handler.DeleteReservation(id);

            return rowsAffected == 1 ? Ok("Registro deletado com sucesso!") : NoContent();
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
}