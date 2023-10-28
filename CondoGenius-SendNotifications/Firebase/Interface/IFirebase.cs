namespace CondoGenius_SendNotifications.Firebase.Interface;

public interface IFirebase
{
    Task<string> SendNotification(string title, string body, string deviceToken);
}