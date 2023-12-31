﻿using CondoGenius_Checks_Domain.Handler.Interfaces;
using CondoGenius_Checks_Domain.Models;
using Microsoft.AspNetCore.Mvc;

namespace CondoGenius_Checks_API.Controllers;

[Route("/")]
[ApiController]
public class ChecksController : ControllerBase
{
    private readonly IChecksHandler _handler;
    
    public ChecksController(IChecksHandler handler)
    {
        _handler = handler;
    }

    [HttpPost]
    public async Task<IActionResult> DoCheckIn([FromBody] DoCheckInRequest request)
    {
        try
        {
            await _handler.DoCheckIn(request.ResidentId);
            
            return Created("", "Check-in efetuado com sucesso!");
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return BadRequest(ex.Message);
        }
    }
    
    [HttpGet("active")]
    public async Task<IActionResult> GetActiveCheckIns()
    {
        try
        {
            var activeCheckins = await _handler.GetActiveCheckins();
            
            return Ok(activeCheckins);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex);
            return BadRequest(ex.Message);
        }
    }
    
    [HttpDelete]
    public async Task<IActionResult> UndoCheckIn([FromBody] DoCheckInRequest request)
    {
        int rowsAffected = await _handler.UndoCheckIn(request.ResidentId);
        
        return rowsAffected == 1 ? Ok("Check-out efetuado com sucesso!") : BadRequest("Check-in não encontrado");
    }
    
    [HttpGet("resident/{id}")]
    public async Task<IActionResult> GetCheckIn([FromRoute] int id)
    {
        var checkIn = await _handler.GetCheckIn(id);
        
        return checkIn != null ? Ok(checkIn) : NotFound("Registro não encontrado!");
    }
}