namespace CondoGenius_Auth.Models;

public class CreateUserRequest
{
    public string Email { get; set; }
    public string Password { get; set; }
    public int RoleId { get; set; }
}