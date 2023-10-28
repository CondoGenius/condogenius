using Newtonsoft.Json;

namespace Global.Shared.Database;

public class Resident
{
    [JsonProperty("name")]
    public string Name { get; set; }
    [JsonProperty("device_token")]
    public string DeviceToken { get; set; }
}