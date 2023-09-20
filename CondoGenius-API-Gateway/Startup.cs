using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CondoGenius_Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics.HealthChecks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Ocelot.Authorization;
using Ocelot.Configuration;
using Ocelot.DependencyInjection;
using Ocelot.Errors.Middleware;
using Ocelot.Middleware;

namespace CondoGenius_API_Gateway;

public class Startup
{
    private readonly IConfiguration _configuration;

    public Startup(IConfiguration configuration)
    {
        this._configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddHealthChecks();
        services.AddHttpContextAccessor();
        services.AddSingleton<JwtTokenHandler>();
        services.AddOcelot(_configuration);
        services.AddCustomJwtAuthentication();
    }

    public async void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }
        
        app.UseRouting();
        app.UseCors(c => c.AllowAnyOrigin()
                    .AllowAnyHeader()
                    .AllowAnyMethod());
        app.UseHealthChecks("/health");
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseEndpoints(e =>
        {
            e.MapControllers();
        });

        var configuration = new OcelotPipelineConfiguration
        {
            AuthorizationMiddleware = async (ctx, next) =>
            {
                if (Authorize(ctx))
                {
                    await next.Invoke();
                }

                ctx.Items.Errors().Add(new UnauthorizedError("Não autorizado!"));
            }
            
        };
        
        await app.UseOcelot(configuration);
    }

    private bool Authorize(HttpContext ctx)
    {
        DownstreamRoute route = (DownstreamRoute)ctx.Items["DownstreamRoute"];
        
        if (route.RouteClaimsRequirement.Count == 0) return true;
        else
        {
            bool authorized = false;

            Claim[] claims = ctx.User.Claims.ToArray();

            Dictionary<string, string> required = route.RouteClaimsRequirement;

            var rolesAuthorized = required["Role"].Split(";");
            
            foreach (var claim in claims)
            {
                var splittedClaim = claim.ToString().Split(":");
                
                if (rolesAuthorized.Any(r => r.Contains(splittedClaim[1].Trim())))
                {
                    Console.WriteLine("Achou a chave nas roles autorizadas");
                    return true;
                }
            }
            return false;
        }
    }
}
