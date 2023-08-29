using Microsoft.AspNetCore.Mvc;

namespace CondoGenius_Reservations_API.Controllers;

[ApiController]
[Route("[controller]")]
public class ReservationsController : ControllerBase
{
    [HttpPost]
    [Route("Create")]
    public async Task<IActionResult> CreateReservation()
    {
        return Ok("Rota de criação da reserva");
    }
    
    [HttpGet]
    [Route("List")]
    public async Task<IActionResult> ListReservations()
    {
        return Ok("Rota de listagem da reserva");
    }
    
    [HttpPut]
    [Route("Update")]
    public async Task<IActionResult> UpdateReservation()
    {
        return Ok("Rota de atualização da reserva");
    }
    
    [HttpDelete]
    [Route("Delete")]
    public async Task<IActionResult> DeleteReservation()
    {
        return Ok("Rota de exclusão da reserva");
    }
}