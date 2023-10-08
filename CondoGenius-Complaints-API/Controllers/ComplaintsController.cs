using CondoGenius_Complaints_Domain.Handler.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CondoGenius_Complaints_API.Controllers;

[ApiController]
[Route("[controller]")]
public class ComplaintsController : ControllerBase
{
    private readonly IComplaintsHandler _handler;
    
    public ComplaintsController(IComplaintsHandler handler)
    {
        _handler = handler;
    }

}