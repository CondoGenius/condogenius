using Newtonsoft.Json;

namespace Global.Shared.Database;

public class Resident
{
    [JsonProperty("name")]
    public string Name { get; set; }
    [JsonProperty("deviceToken")]
    public string DeviceToken { get; set; }
}