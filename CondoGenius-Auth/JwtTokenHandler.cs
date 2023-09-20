using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CondoGenius_Auth.Models;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace CondoGenius_Auth;

public class JwtTokenHandler
{
    public const string JWT_KEY = "yPkCqn4KSWLtaJwXvN2jGzpQRH3gSJsVlrMIMf278";
    private const int JWT_TOKEN_VALIDATY_MINS = 600;
    private readonly List<User> _usersList;
    
    public JwtTokenHandler()
    {
        _usersList = new()
        {
            new User() { UserName = "Admin", Password = "admin123", Role = "Admin" },
            new User() { UserName = "Resident", Password = "resident123", Role = "Resident" },
            new User() { UserName = "Nobody", Password = "nobody1", Role = "Nobody" }
        };
    }

    public AuthResponse? GenerateJwtToken(AuthRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.User) || string.IsNullOrWhiteSpace(request.Password))
            return null;
        
        //MUDAR PRA PEGAR DO BANCO - PRECISA HASHEAR A SENHA

        var user = _usersList.FirstOrDefault(x => x.UserName == request.User 
                                                  && x.Password == request.Password);

        if (user == null) return null;

        var tokenExpiration = DateTime.Now.AddMinutes(JWT_TOKEN_VALIDATY_MINS);
        var tokenKey = Encoding.ASCII.GetBytes(JWT_KEY);
        var claimsIdentity = new ClaimsIdentity(new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Name, request.User),
            new Claim("Role", user.Role)
        });

        var signingCredentials = new SigningCredentials(
            new SymmetricSecurityKey(tokenKey),
            SecurityAlgorithms.HmacSha256Signature);

        var securityTokenDescriptor = new SecurityTokenDescriptor()
        {
            Subject = claimsIdentity,
            Expires = tokenExpiration,
            SigningCredentials = signingCredentials
        };

        var jwtSecurityTokenHandler = new JwtSecurityTokenHandler();
        var securityToken = jwtSecurityTokenHandler.CreateToken(securityTokenDescriptor);
        var token = jwtSecurityTokenHandler.WriteToken(securityToken);

        return new AuthResponse()
        {
            User = user.UserName,
            ExpiresIn = tokenExpiration.ToString("dd/MM/yyyy hh:mm:ss"),
            JwtToken = token
        };
    }
}