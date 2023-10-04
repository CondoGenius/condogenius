using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CondoGenius_Auth_Repository.Repositories.Interfaces;
using CondoGenius_Auth.Models;
using Microsoft.IdentityModel.Tokens;
using JwtRegisteredClaimNames = Microsoft.IdentityModel.JsonWebTokens.JwtRegisteredClaimNames;

namespace CondoGenius_Auth;

public class JwtTokenHandler
{
    public const string JWT_KEY = "yPkCqn4KSWLtaJwXvN2jGzpQRH3gSJsVlrMIMf278";
    private const int JWT_TOKEN_VALIDATY_MINS = 600;
    private IUserRepository _userRepository;
    
    public JwtTokenHandler(IUserRepository repository)
    {
        _userRepository = repository;
    }

    public async Task<AuthResponse?> GenerateJwtToken(AuthRequest request)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(request.User) || string.IsNullOrWhiteSpace(request.Password))
                return null;

            var user = await _userRepository.GetUserByUsernameAndPassword(request.User, request.Password);

            if (user == null) return null;

            var passwordHash = Hasher.Hasher.ComputeHash(request.Password, user.PasswordSalt,
                int.Parse(Environment.GetEnvironmentVariable("Iterations")));

            if (passwordHash != user.Password) return null;

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
                JwtToken = token,
                Role = user.Role
            };
        }
        catch (Exception ex)
        {
            Console.WriteLine("Erro ao gerar token no método JwtTokenHandler");
            throw;
        }
    }
}