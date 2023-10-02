namespace CondoGenius_Auth_Shared.Models;

public class User
{
    public string UserName { get; set; }
    public string Password { get; set; }
    public string PasswordSalt { get; set; }
    public string Role { get; set; }
}