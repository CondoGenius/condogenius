using CondoGenius_Deliveries_Domain.Handler.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CondoGenius_Deliveries_API.Controllers;

[ApiController]
[Route("[controller]")]
public class DeliveriesController : ControllerBase
{
    private readonly IDeliveriesHandler _handler;
    
    public DeliveriesController(IDeliveriesHandler handler)
    {
        _handler = handler;
    }
}