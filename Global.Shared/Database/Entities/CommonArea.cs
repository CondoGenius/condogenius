namespace Global.Shared.Database.Entities;

public class CommonArea
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Capacity { get; set; }
    public string BusinessHour { get; set; }
    public bool IsActive { get; set; }
    public string Image { get; set; }
}