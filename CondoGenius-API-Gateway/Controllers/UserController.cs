using System.Threading.Tasks;
using CondoGenius_Auth.Handler.Interfaces;
using CondoGenius_Auth.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CondoGenius_API_Gateway.Controllers;

[Route("api/user")]
[ApiController]
public class UserController : ControllerBase
{
    private readonly IUserHandler _handler;

    public UserController(IUserHandler handler)
    {
        _handler = handler;
    }
    
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> CreateUser([FromBody] CreateUserRequest request)
    {
        await _handler.CreateUser(request);

        return Ok("Usuário criado com sucesso!");
    }
}