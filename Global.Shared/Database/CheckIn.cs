namespace Global.Shared.Database;

public class CheckIn
{
    public int Id { get; set; }
    public int CommonAreaId { get; set; }
    public int ResidentId { get; set; }
    public string ResidentName { get; set; }
    public string DeviceToken { get; set; }
    public DateTime CreatedAt { get; set; }
}