using CondoGenius_Auth_Repository.Queries.User.Interface;
using CondoGenius_Auth_Repository.Repositories.Interfaces;
using CondoGenius_Auth_Shared.Models;
using Dapper;
using Global.Shared;

namespace CondoGenius_Auth_Repository.Repositories;

public class UserRepository : BaseRepository, IUserRepository
{
    private readonly IUserQueries _queries;
    
    public UserRepository(IUserQueries queries)
    {
        _queries = queries;
    }

    public async Task CreateUser(string email, string password, int roleId)
    {
        try
        {
            await using var conn = GetConnection();

            await conn.OpenAsync();

            await conn.ExecuteAsync(_queries.CreateUser(), new
            {
                Email = email,
                Password = password,
                RoleId = roleId
            });
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Ocorreu um erro ao executar a função CreateUser() no módulo UserRepository() ao enviar os seguintes parâmetros: {email}, {password}, {roleId}");
            throw;
        }
    }

    public async Task<User> GetUserByUsernameAndPassword(string username, string password)
    {
        await using var conn = GetConnection();

        await conn.OpenAsync();

        var user = await conn.QueryFirstOrDefaultAsync<User>(_queries.GetUserByUsernameAndPassword(), new
        {
            Email = username,
            Password = password
        });

        return user;
    }
}