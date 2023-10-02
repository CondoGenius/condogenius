namespace CondoGenius_Auth_Repository.Queries.User.Interface;

public interface IUserQueries
{
    public string CreateUser();
    public string GetUserByUsernameAndPassword();
}