namespace CondoGenius_Firebase;

public interface IFirebase
{
    Task<string> SendNotification(string title, string body, string deviceToken);
}