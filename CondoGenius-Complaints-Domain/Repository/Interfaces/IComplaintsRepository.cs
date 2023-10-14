using CondoGenius_Complaints_Domain.Requests;
using Global.Shared.Database.Entities;

namespace CondoGenius_Complaints_Domain.Repository.Interfaces;

public interface IComplaintsRepository
{
    Task<int> CreateComplaint(CreateComplaintRequest request);
    Task<int> UpdateComplaint(int id, CreateComplaintRequest updatedEntity);
    Task<Complaint> GetComplaint(int id);
    Task<List<Complaint>> GetAllComplaints();
    Task<List<Complaint>> GetComplaintsByResidence(int id);
    Task<List<Complaint>> GetComplaintsByResident(int id);
    Task<int> DeleteComplaint(int id);

}