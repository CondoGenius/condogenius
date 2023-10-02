using System.Security.Cryptography;
using CondoGenius_Auth_Repository.Repositories.Interfaces;
using CondoGenius_Auth.Handler.Interfaces;
using CondoGenius_Auth.Models;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace CondoGenius_Auth.Handler;

public class UserHandler : IUserHandler
{
    public IUserRepository _repository;
    
    public UserHandler(IUserRepository repository)
    {
        _repository = repository;
    }
    public async Task CreateUser(CreateUserRequest request)
    {
        var passwordSalt = Hasher.Hasher.GenerateSalt();
        
        var passwordHash = Hasher.Hasher.ComputeHash(request.Password, passwordSalt, int.Parse(Environment.GetEnvironmentVariable("Iterations")));
        
        await _repository.CreateUser(request.Email, passwordHash, passwordSalt, request.RoleId);
    }
}