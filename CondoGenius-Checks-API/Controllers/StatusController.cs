using Microsoft.AspNetCore.Mvc;

namespace CondoGenius_Checks_API.Controllers;

[ApiController]
[Route("[controller]")]
public class StatusController : ControllerBase
{
    [HttpGet]
    public IActionResult Status()
    {
        return Ok("Checks API is online!");
    }
}