namespace CondoGenius_Deliveries_Domain.Requests;

public class CreateDeliveryRequest
{
    public int UserId { get; set; }
    public int ResidenceId { get; set; }
}