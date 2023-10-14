namespace Global.Shared.Database.Entities;

public class Complaint
{
    public int Id { get; set; }
    public string Description { get; set; }
    public string Status { get; set; }
    public string ComplainterName { get; set; }
    public string ComplainterLastName { get; set; }
    public int Number { get; set; }
    public int Floor { get; set; }
    public int Block { get; set; }
}