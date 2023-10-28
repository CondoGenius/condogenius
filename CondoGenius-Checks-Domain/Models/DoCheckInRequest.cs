using Newtonsoft.Json;

namespace CondoGenius_Checks_Domain.Models;

public class DoCheckInRequest
{
    [JsonProperty("resident_id")]
    public int ResidentId { get; set; }
}