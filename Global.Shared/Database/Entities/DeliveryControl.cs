namespace Global.Shared.Database.Entities;

public class DeliveryControl
{
    public int Id { get; set; }
    public string Status { get; set; }
    public string ReceivedBy { get; set; }
    public DateTime DeliveredAt { get; set; }
    public DateTime ReceivedAt { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime UpdatedAt { get; set; }
    public int ResidentId { get; set; }
    public int ResidenceId { get; set; }
    public string ResidentEmail { get; set; }
}
