using CondoGenius_Complaints_Domain.Handler.Interfaces;
using CondoGenius_Complaints_Domain.Repository.Interfaces;
using CondoGenius_Complaints_Domain.Requests;
using Global.Shared.Database.Entities;

namespace CondoGenius_Complaints_Domain.Handler;

public class ComplaintsHandler : IComplaintsHandler
{
    private readonly IComplaintsRepository _repository;

    public ComplaintsHandler(IComplaintsRepository repository)
    {
        _repository = repository;
    }

    public async Task<int> CreateComplaint(CreateComplaintRequest request)
    {
        return await _repository.CreateComplaint(request);
    }
    public async Task<List<Complaint>> ListComplaints()
    {
        return await _repository.GetAllComplaints();
    }

    public async Task<Complaint> ListComplaint(int id)
    {
        return await _repository.GetComplaint(id);
    }

    public async Task<List<Complaint>> ListComplaintsByResidence(int id)
    {
        return await _repository.GetComplaintsByResidence(id);
    }

    public async Task<int> DeleteComplaint(int id)
    {
        return await _repository.DeleteComplaint(id);
    }

    public async Task<int> UpdateComplaint(int id, CreateComplaintRequest request)
    {
        return await _repository.UpdateComplaint(id, request);
    }

}