using System.Security.Cryptography;
using CondoGenius_Auth_Repository.Repositories.Interfaces;
using CondoGenius_Auth.Handler.Interfaces;
using CondoGenius_Auth.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace CondoGenius_Auth.Handler;

public class UserHandler : IUserHandler
{
    public IUserRepository _repository;
    public Hasher.Hasher _hasher;
    
    public UserHandler(IUserRepository repository)
    {
        _repository = repository;
        _hasher = new Hasher.Hasher();
    }
    public async Task CreateUser(CreateUserRequest request)
    {
        await _repository.CreateUser(request.Email, request.Password, request.RoleId);
    }
}