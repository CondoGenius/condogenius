using CondoGenius_Checks_Domain.Handler.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CondoGenius_Checks_API.Controllers;

[Route("[controller]")]
[ApiController]
public class ChecksController : ControllerBase
{
    private readonly IChecksHandler _handler;
    
    public ChecksController(IChecksHandler handler)
    {
        _handler = handler;
    }
}