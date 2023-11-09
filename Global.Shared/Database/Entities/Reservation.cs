namespace Global.Shared.Database.Entities;

public class Reservation
{
    public int Id { get; set; }
    public int ResidentId { get; set; }
    public string ResidentName { get; set; }
    public DateTime ReserveDate { get; set; }
    public DateTime CreatedAt { get; set; }
    public string CommonAreaName { get; set; }
    public string DeviceToken { get; set; }
    public List<GuestList> GuestList { get; set; }
}