using CondoGenius_Complaints_Domain.Handler.Interfaces;
using CondoGenius_Complaints_Domain.Requests;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace CondoGenius_Complaints_API.Controllers;

[ApiController]
[Route("/")]
public class ComplaintsController : ControllerBase
{
    private readonly IComplaintsHandler _handler;

    public ComplaintsController(IComplaintsHandler handler)
    {
        _handler = handler;
    }

    // GET: / (Read)
    [HttpGet]
    public async Task<IActionResult> GetComplaints()
    {
        return Ok(await _handler.ListComplaints());
    }

    // GET: /1 (Read)
    [HttpGet("{id}")]
    public async Task<IActionResult> GetComplaint([FromRoute] int id)
    {
        return Ok(await _handler.ListComplaint(id));
    }
    
    // GET: /residence/1 (Read)
    [HttpGet("residence/{id}")]
    public async Task<IActionResult> GetComplaintByResidence([FromRoute] int id)
    {
        return Ok(await _handler.ListComplaintsByResidence(id));
    }
    
    // GET: api/complaints/resident/1 (Read)
    [HttpGet("resident/{id}")]
    public async Task<IActionResult> GetComplaintByResident([FromRoute] int id)
    {
        return Ok(await _handler.ListComplaintsByResident(id));
    }

    // POST: api/complaints (Create)
    [HttpPost]
    public async Task<IActionResult> CreateComplaint([FromBody] CreateComplaintRequest request)
    {
        var rowsAffected = await _handler.CreateComplaint(request);

        return rowsAffected == 1 ? Created("", "Registro criado com sucesso!") : BadRequest("Não foi possível criar o registro!");
    }

    // PUT: api/complaints/1 (Update)
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateComplaint([FromRoute] int id, [FromBody] CreateComplaintRequest request)
    {
        var rowsAffected = await _handler.UpdateComplaint(id, request);

        return rowsAffected == 1 ? Ok("Registro atualizado com sucesso!") : NoContent();
    }

    // DELETE: api/complaints/1 (Delete)
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteComplaint([FromRoute] int id)
    {
        var rowsAffected = await _handler.DeleteComplaint(id);
        
        return rowsAffected == 1 ? Ok("Registro deletado com sucesso!") : NoContent();
    }
}
