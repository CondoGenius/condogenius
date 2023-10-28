using CondoGenius_Deliveries_Domain.Handler.Interfaces;
using CondoGenius_Deliveries_Domain.Requests;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CondoGenius_Deliveries_API.Controllers;

[ApiController]
[Route("/")]
public class DeliveriesController : ControllerBase
{
    private readonly IDeliveriesHandler _handler;

    public DeliveriesController(IDeliveriesHandler handler)
    {
        _handler = handler;
    }

    // GET: / (Read)
    [HttpGet]
    public async Task<IActionResult> GetDeliveries()
    {
        return Ok(await _handler.ListDeliveries());
    }

    // GET: /1 (Read)
    [HttpGet("{id}")]
    public async Task<IActionResult> GetDelivery([FromRoute] int id)
    {
        return Ok(JsonConvert.SerializeObject(await _handler.ListDelivery(id)));
    }
    
    // GET: /residence/1 (Read)
    [HttpGet("residence/{id}")]
    public async Task<IActionResult> GetDeliveryByResidence([FromRoute] int id)
    {
        return Ok(await _handler.ListDeliveriesByResidence(id));
    }

    // POST: api/deliveries (Create)
    [HttpPost]
    public async Task<IActionResult> CreateDelivery([FromBody] CreateDeliveryRequest request)
    {
        var rowsAffected = await _handler.CreateDelivery(request);

        return rowsAffected == 1 ? Created("", "Registro criado com sucesso!") : BadRequest("Não foi possível criar o registro!");
    }

    // PUT: /1 (Update)
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDelivery([FromRoute] int id)
    {
        var rowsAffected = await _handler.UpdateDelivery(id);

        return rowsAffected == 1 ? Ok("Registro atualizado com sucesso!") : NoContent();
    }

    // DELETE: /1 (Delete)
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteDelivery([FromRoute] int id)
    {
        var rowsAffected = await _handler.DeleteDelivery(id);
        
        return rowsAffected == 1 ? Ok("Registro deletado com sucesso!") : NoContent();
    }
}