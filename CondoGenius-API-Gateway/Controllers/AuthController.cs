using CondoGenius_Auth;
using CondoGenius_Auth.Models;
using Microsoft.AspNetCore.Mvc;

namespace CondoGenius_API_Gateway.Controllers;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly JwtTokenHandler _tokenHandler;

    public AuthController(JwtTokenHandler jwtTokenHandler)
    {
        _tokenHandler = jwtTokenHandler;
    }

    [Route("login")]
    public ActionResult<AuthResponse?> Login([FromBody] AuthRequest request)
    {
        var authResponse = _tokenHandler.GenerateJwtToken(request);

        if (authResponse == null) return Unauthorized();

        return authResponse;
    }
}