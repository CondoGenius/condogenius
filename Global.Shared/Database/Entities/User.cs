namespace Global.Shared.Database.Entities;

public class User
{
    public string Email { get; set; }
    public int RoleId { get; set; }
    public string DeviceToken { get; set; }
}