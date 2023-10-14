using Newtonsoft.Json;

namespace CondoGenius_Deliveries_Domain.Requests;

public class CreateDeliveryRequest
{
    [JsonProperty("user_id")]
    public int UserId { get; set; }
    [JsonProperty("residence_id")]
    public int ResidenceId { get; set; }
}