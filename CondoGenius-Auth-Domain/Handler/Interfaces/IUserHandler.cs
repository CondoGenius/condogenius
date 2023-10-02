using CondoGenius_Auth.Models;

namespace CondoGenius_Auth.Handler.Interfaces;

public interface IUserHandler
{
    public Task CreateUser(CreateUserRequest request);
}