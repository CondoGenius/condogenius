using Newtonsoft.Json;

namespace CondoGenius_Reservations_Domain.Requests;

public class CreateReservationRequest
{
    [JsonProperty("resident_id")]
    public string ResidentId { get; set; }
    [JsonProperty("area_id")]
    public string AreaId { get; set; }
    [JsonProperty("type")]
    public string Type { get; set; }
    [JsonProperty("date")]
    public DateTime Date { get; set; }
}