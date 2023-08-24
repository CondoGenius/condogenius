using Microsoft.AspNetCore.Mvc;

namespace CondoGenius_Complaints_API.Controllers;

[ApiController]
[Route("[controller]")]
public class StatusController : ControllerBase
{
    [HttpGet]
    public IActionResult Status()
    {
        return Ok("Complaints API is online!");
    }
}