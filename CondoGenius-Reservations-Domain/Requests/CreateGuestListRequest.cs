using Global.Shared.Database.Entities;
using Newtonsoft.Json;

namespace CondoGenius_Reservations_Domain.Requests;

public class CreateGuestListRequest
{
    [JsonProperty("reserve_id")]
    public int ReserveId { get; set; }
    [JsonProperty("name")]
    public string Name { get; set; }
    [JsonProperty("cpf")]
    public string Cpf { get; set; }
}