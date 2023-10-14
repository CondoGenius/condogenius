using CondoGenius_Complaints_Domain.Repository.Interfaces;
using CondoGenius_Complaints_Domain.Requests;
using CondoGenius_Complaints_Infra.Queries.Interface;
using Dapper;
using Global.Shared;
using Global.Shared.Database.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CondoGenius_Complaints_Infra.Repository
{
    public class ComplaintsRepository : BaseRepository, IComplaintsRepository
    {
        private readonly IComplaintsQueries _queries;

        public ComplaintsRepository(IComplaintsQueries queries)
        {
            _queries = queries;
        }

        public async Task<int> CreateComplaint(CreateComplaintRequest request)
        {
            try
            {
                await using var conn = GetConnection();
                await conn.OpenAsync();

                return await conn.ExecuteAsync(_queries.CreateComplaint(), new
                {
                    ResidenceToComplaintId = request.ResidenceId,
                    ResidentId = request.ResidentId,
                    Description = request.Description,
                    Status = request.Status
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Não foi possível criar a reclamação. Erro: {ex.Message}");
                throw;
            }
        }

        public async Task<int> UpdateComplaint(int id, CreateComplaintRequest updatedEntity)
        {
            try
            {
                await using var conn = GetConnection();
                await conn.OpenAsync();

                return await conn.ExecuteAsync(_queries.UpdateComplaint(), new
                {
                    Id = id,  // O ID da reclamação a ser atualizada
                    Description = updatedEntity.Description,  // A nova descrição da reclamação
                    Status = updatedEntity.Status  // O novo status da reclamação
                });
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Não foi possível atualizar a reclamação. Erro: {ex.Message}");
                throw;
            }
        }

        public async Task<Complaint> GetComplaint(int id)
        {
            await using var conn = GetConnection();
            await conn.OpenAsync();

            return await conn.QuerySingleAsync<Complaint>(_queries.GetComplaint(), new
            {
                Id = id
            });
        }

        public async Task<List<Complaint>> GetAllComplaints()
        {
            await using var conn = GetConnection();
            await conn.OpenAsync();

            return (await conn.QueryAsync<Complaint>(_queries.GetAllComplaints())).ToList();
        }

        public async Task<List<Complaint>> GetComplaintsByResidence(int id)
        {
            await using var conn = GetConnection();
            await conn.OpenAsync();

            return (await conn.QueryAsync<Complaint>(_queries.GetComplaintByResidence(), new
            {
                ResidenceId = id
            })).ToList();
        }
        
        public async Task<List<Complaint>> GetComplaintsByResident(int id)
        {
            await using var conn = GetConnection();
            await conn.OpenAsync();

            return (await conn.QueryAsync<Complaint>(_queries.ListComplaintsByResident(), new
            {
                ResidentId = id
            })).ToList();
        }

        public async Task<int> DeleteComplaint(int id)
        {
            await using var conn = GetConnection();
            await conn.OpenAsync();

            return await conn.ExecuteAsync(_queries.DeleteComplaint(), new
            {
                Id = id
            });
        }
    }
}
