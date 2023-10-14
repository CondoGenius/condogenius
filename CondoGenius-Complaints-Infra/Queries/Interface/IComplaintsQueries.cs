namespace CondoGenius_Complaints_Infra.Queries.Interface;

public interface IComplaintsQueries
{
    string CreateComplaint();
    string GetComplaint();
    string GetAllComplaints();
    string GetComplaintByResidence();
    string ListComplaintsByResident();
    string UpdateComplaint();
    string DeleteComplaint();
}