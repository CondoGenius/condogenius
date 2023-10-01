using CondoGenius_Auth_Shared.Models;

namespace CondoGenius_Auth_Repository.Repositories.Interfaces;

public interface IUserRepository
{
    public Task CreateUser(string email, string password, int roleId);
    public Task<User> GetUserByUsernameAndPassword(string username, string password);
}