using CondoGenius_Deliveries_Domain.Handler.Interfaces;
using CondoGenius_Deliveries_Domain.Requests;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CondoGenius_Deliveries_API.Controllers;

[ApiController]
[Route("api/deliveries")]
public class DeliveriesController : ControllerBase
{
    private readonly IDeliveriesHandler _handler;

    public DeliveriesController(IDeliveriesHandler handler)
    {
        _handler = handler;
    }

    // GET: api/deliveries (Read)
    [HttpGet]
    public async Task<IActionResult> GetDeliveries()
    {
        return Ok(await _handler.ListDeliveries());
    }

    // GET: api/deliveries/1 (Read)
    [HttpGet("{id}")]
    public async Task<IActionResult> GetDelivery([FromRoute] int id)
    {
        return Ok(await _handler.ListDelivery(id));
    }
    
    // GET: api/deliveries/residence/1 (Read)
    [HttpGet("{id}")]
    public async Task<IActionResult> GetDeliveryByResidence([FromRoute] int residenceId)
    {
        return null;
    }

    // POST: api/deliveries (Create)
    [HttpPost]
    public async Task<IActionResult> CreateDelivery([FromBody] CreateDeliveryRequest request)
    {
        await _handler.CreateDelivery(request);

        return Ok(JsonConvert.SerializeObject(new { Message = "Entrega criada com sucesso!" }));
    }

    // PUT: api/deliveries/1 (Update)
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateDelivery([FromRoute] int id, [FromBody] CreateDeliveryRequest request)
    {
        await _handler.UpdateDelivery(id, request.Status, request.ReceivedBy);

        return Ok("Registro atualizado com sucesso!");
    }

    // DELETE: api/deliveries/1 (Delete)
    [HttpDelete("{id}")]
    public IActionResult DeleteDelivery()
    {
        return null;
    }
}