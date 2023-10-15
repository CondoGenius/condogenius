namespace Global.Shared.Database.Entities;

public class Complaint
{
    public int Id { get; set; }
    public string Description { get; set; }
    public string Status { get; set; }
    public string ResidentName { get; set; }
    public string ResidentLastName { get; set; }
    public int ResidenceNumber { get; set; }
    public int Floor { get; set; }
    public int Block { get; set; }
    public DateTime Date { get; set; }
}