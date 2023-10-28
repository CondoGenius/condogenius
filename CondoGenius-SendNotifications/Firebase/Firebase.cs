using CondoGenius_SendNotifications.Firebase.Interface;
using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;

namespace CondoGenius_SendNotifications.Firebase;

public class Firebase : IFirebase
{
    public async Task<string> SendNotification(string title, string body, string deviceToken)
    {
        var message = new FirebaseAdmin.Messaging.Message
        {
            Notification = new FirebaseAdmin.Messaging.Notification
            {
                Title = title,
                Body = body
            },
            Token = deviceToken
        };

        return await FirebaseAdmin.Messaging.FirebaseMessaging.DefaultInstance.SendAsync(message);
    }
}