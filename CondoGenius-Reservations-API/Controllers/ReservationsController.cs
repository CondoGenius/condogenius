using CondoGenius_Reservations_Domain.Handler.Interfaces;
using CondoGenius_Reservations_Domain.Requests;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CondoGenius_Reservations_API.Controllers;

[ApiController]
[Route("api/reservations")]
public class ReservationsController : ControllerBase
{
    private readonly IReservationsHandler _handler;

    public ReservationsController(IReservationsHandler handler)
    {
        _handler = handler;
    }

    // GET: api/reservations (Read)
    [HttpGet]
    public async Task<IActionResult> GetReservations()
    {
        return Ok(await _handler.ListReservations());
    }

    // GET: api/reservations/1 (Read)
    [HttpGet("{id}")]
    public async Task<IActionResult> GetReservation([FromRoute] int id)
    {
        return Ok(await _handler.ListReservation(id));
    }

    // GET: api/reservations/residence/1 (Read)
    [HttpGet("residence/{id}")]
    public async Task<IActionResult> GetReservationByResidence([FromRoute] int id)
    {
        return Ok(await _handler.ListReservationsByResidence(id));
    }

    // POST: api/reservations (Create)
    [HttpPost]
    public async Task<IActionResult> CreateReservation([FromBody] CreateReservationRequest request)
    {
        var rowsAffected = await _handler.CreateReservation(request);

        return rowsAffected == 1 ? Created("", "Registro criado com sucesso!") : BadRequest("Não foi possível criar o registro!");
    }

    // PUT: api/reservations/1 (Update)
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateReservation([FromRoute] int id)
    {
        var rowsAffected = await _handler.UpdateReservation(id);

        return rowsAffected == 1 ? Ok("Registro atualizado com sucesso!") : NoContent();
    }

    // DELETE: api/reservations/1 (Delete)
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteReservation([FromRoute] int id)
    {
        var rowsAffected = await _handler.DeleteReservation(id);
        
        return rowsAffected == 1 ? Ok("Registro deletado com sucesso!") : NoContent();
    }
}