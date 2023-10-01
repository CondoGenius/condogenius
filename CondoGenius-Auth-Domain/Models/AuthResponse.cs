namespace CondoGenius_Auth.Models;

public class AuthResponse
{
    public string User { get; set; }
    public string JwtToken { get; set; }
    public string ExpiresIn { get; set; }
    public string Role { get; set; }
}