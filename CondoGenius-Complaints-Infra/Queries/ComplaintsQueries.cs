using CondoGenius_Complaints_Infra.Queries.Interface;

namespace CondoGenius_Complaints_Infra.Queries;

public class ComplaintsQueries : IComplaintsQueries
{
    public string CreateComplaint()
    {
        return File.ReadAllText("/src/SQLs/CreateComplaint.sql");
    }

    public string GetComplaint()
    {
        return File.ReadAllText("/src/SQLs/GetComplaint.sql");
    }

    public string GetAllComplaints()
    {
        return File.ReadAllText("/src/SQLs/GetAllComplaints.sql");
    }

    public string GetComplaintByResidence()
    {
        return File.ReadAllText("/src/SQLs/ListComplaintsByResidence.sql");
    }

    public string ListComplaintsByResident()
    {
        return File.ReadAllText("/src/SQLs/ListComplaintsByResidentWhoOpenedIt.sql");
    }

    public string UpdateComplaint()
    {
        return File.ReadAllText("/src/SQLs/UpdateComplaint.sql");
    }

    public string DeleteComplaint()
    {
        return File.ReadAllText("/src/SQLs/DeleteComplaint.sql");
    }
}