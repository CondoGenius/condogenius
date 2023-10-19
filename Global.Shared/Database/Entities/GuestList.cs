using Newtonsoft.Json;

namespace Global.Shared.Database.Entities;

public class GuestList
{
    public int? Id { get; set; }
    [JsonProperty("name")]
    public string Name { get; set; }
    [JsonProperty("cpf")]
    public string Cpf { get; set; }
    public DateTime CreatedAt { get; set; }
}