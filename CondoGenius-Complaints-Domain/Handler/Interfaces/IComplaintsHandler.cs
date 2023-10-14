using CondoGenius_Complaints_Domain.Requests;
using Global.Shared.Database.Entities;

namespace CondoGenius_Complaints_Domain.Handler.Interfaces;

public interface IComplaintsHandler
{
    public Task<int> CreateComplaint(CreateComplaintRequest request);
    public Task<int> UpdateComplaint(int id, CreateComplaintRequest request);
    public Task<List<Complaint>> ListComplaints();
    public Task<Complaint> ListComplaint(int id);
    public Task<List<Complaint>> ListComplaintsByResidence(int id);
    public Task<int> DeleteComplaint(int id);

}