using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;

namespace CondoGenius_Firebase;

public class Firebase
{
    public FirebaseApp FirebaseApp { get; }

    public Firebase()
    {
        FirebaseApp = FirebaseApp.Create(new AppOptions
        {
            Credential = GoogleCredential.FromFile("/condogenius-firebaseadmin-key.json"),
            ProjectId = "1:780347999304:android:f551c4687d6e9d3fab447d",
        });
    }

    public Task SendNotification(string title, string body)
    {
        var message = new FirebaseAdmin.Messaging.Message
        {
            Notification = new FirebaseAdmin.Messaging.Notification
            {
                Title = title,
                Body = body
            },
            Token = ""
        };

        return FirebaseAdmin.Messaging.FirebaseMessaging.DefaultInstance.SendAsync(message);
    }
}