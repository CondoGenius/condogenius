using System.Threading.Tasks;
using CondoGenius_API_Gateway.Models;
using Microsoft.AspNetCore.DataProtection.Internal;
using Microsoft.AspNetCore.Mvc;

namespace CondoGenius_API_Gateway.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{

    [HttpPost]
    [Route("Login")]
    public async Task<IActionResult> Login([FromBody] User user)
    {
        if (user.Username != "ADMIN" && user.Password == "ADMIN")
        {
            return NotFound("Usuário não encontrado!");
        }

        var token = TokenService.GenerateToken(user);

        return Ok(new { User = user.Username, Roles = user.Role, Token = token });
    }
    
}