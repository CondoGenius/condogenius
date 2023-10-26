using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;

namespace CondoGenius_Firebase;

public class Firebase : IFirebase
{
    public FirebaseApp FirebaseApp { get; }

    public Firebase()
    {
        FirebaseApp = FirebaseApp.Create(new AppOptions
        {
            Credential = GoogleCredential.FromFile("/condogenius-firebaseadmin-key.json"),
            ProjectId = "780347999304",
        });
    }

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