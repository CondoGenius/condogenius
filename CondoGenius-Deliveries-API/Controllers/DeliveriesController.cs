using CondoGenius_Deliveries_Domain.Handler.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
    public IActionResult GetDeliveries()
    {
        return null;
    }

    // GET: api/deliveries/1 (Read)
    [HttpGet("{id}")]
    public IActionResult GetDelivery(int id)
    {
        return null;
    }

    // POST: api/deliveries (Create)
    [HttpPost]
    public IActionResult CreateDelivery()
    {
        return null;
    }

    // PUT: api/deliveries/1 (Update)
    [HttpPut("{id}")]
    public IActionResult UpdateDelivery()
    {
        return null;
    }

    // DELETE: api/deliveries/1 (Delete)
    [HttpDelete("{id}")]
    public IActionResult DeleteDelivery()
    {
        return null;
    }
}