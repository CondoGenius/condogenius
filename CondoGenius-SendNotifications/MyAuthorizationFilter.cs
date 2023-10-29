using Hangfire.Dashboard;

namespace CondoGenius_SendNotifications;

public class MyAuthorizationFilter : IDashboardAuthorizationFilter
{
    public bool Authorize(DashboardContext context) => true;
}