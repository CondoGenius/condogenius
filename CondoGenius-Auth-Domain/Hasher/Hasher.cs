
namespace CondoGenius_Auth.Hasher;

public class Hasher
{
    public string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    public bool VerifyHash(string plainPassword, string passwordHash)
    {
        return BCrypt.Net.BCrypt.Verify(plainPassword, passwordHash);
    }
}