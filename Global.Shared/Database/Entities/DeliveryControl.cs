using Newtonsoft.Json;

namespace Global.Shared.Database.Entities;

public class DeliveryControl
{
    [JsonProperty("id")] public int Id { get; set; }
    [JsonProperty("status")] public string Status { get; set; }
    [JsonProperty("delivered_at")] public DateTime? DeliveredAt { get; set; }
    [JsonProperty("received_at")] public DateTime ReceivedAt { get; set; }
    [JsonProperty("created_at")] public DateTime CreatedAt { get; set; }
    [JsonProperty("updated_at")] public DateTime UpdatedAt { get; set; }
    [JsonProperty("residence_id")] public int ResidenceId { get; set; }
    [JsonProperty("admin_name")] public string AdminName { get; set; }
    [JsonProperty("admin_last_name")] public string AdminLastName { get; set; }
    [JsonProperty("admin_email")] public string AdminEmail { get; set; }
}