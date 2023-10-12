namespace CondoGenius_Deliveries_Domain.Requests;

public class CreateDeliveryRequest
{
    public string Status { get; set; }
    public string ReceivedBy { get; set; }
    public int ResidentId { get; set; }
}