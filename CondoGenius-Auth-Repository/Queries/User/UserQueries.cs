using CondoGenius_Auth_Repository.Queries.User.Interface;

namespace CondoGenius_Auth_Repository.Queries.User;

public class UserQueries : IUserQueries
{
    public string CreateUser()
    {
        return File.ReadAllText("/src/CreateUser.sql");
    }
    public string GetUserByUsernameAndPassword()
    {
        return File.ReadAllText("/src/GetUserByUsernameAndPassword.sql");
    }
}