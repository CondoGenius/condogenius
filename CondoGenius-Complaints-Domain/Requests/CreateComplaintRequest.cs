using Newtonsoft.Json;

namespace CondoGenius_Complaints_Domain.Requests;

public class CreateComplaintRequest
{
    [JsonProperty("residence_id")]
    public int ResidenceId { get; set; }
    [JsonProperty("resident_id")]
    public int ResidentId { get; set; }
    [JsonProperty("description")]
    public string Description { get; set; }
    [JsonProperty("status")]
    public string Status { get; set; }
}