using api.Models;
using api.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

[ApiController]
[Route("api/v1")]
public class UserController :ControllerBase
{
    //Injeta automaticamente appsettings na instancia da classe
    private readonly IConfiguration _configuration;
    private readonly IUserService _userService;
    
    public UserController(IConfiguration configuration, IUserService  userService)
    {
        _configuration = configuration;
        _userService = userService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] User model)
    {
        var user = await _userService.FindByEmailAndPassword(model.Email, model.Password);
        if (user == null)
        {
            return NotFound( new { message = "Invalid email or password" });
        }
        
        var token = TokenService.GenerateToken(user, _configuration["JwtSettings:SecretKey"]);
        user.Password = "";

        return Ok(new
        {
            user,
            token
        });

    }
    
    [HttpGet("anonymous")]
    [AllowAnonymous]
    public IActionResult Anonymous()
    {
        return Ok(new { message = "Qualquer um pode acessar sem autenticação" });
    }
    
    [HttpGet("authenticated")]
    [Authorize]
    public IActionResult Authenticated()
    {
        return Ok(new { message = $"Somente usuários autenticados podem acessar! User logado: {User.Identity.Name}" });
    }
    
    [HttpGet("authenticated-admin")]
    [Authorize(Policy = "Admin")]
    public IActionResult AuthenticatedAdmin()
    {
        return Ok(new { message = $"Somente usuários autenticados com role admin podem acessar! User logado: {User.Identity.Name}" });
    }


    [HttpPost("register")]
    [Authorize(Policy = "Admin")]
    public async Task<IActionResult> Register([FromBody] User model)
    {
        try
        {
            if (model != null)
            {
                await _userService.Insert(model);
                return StatusCode(StatusCodes.Status201Created, "Usuario cadastrado com sucesso");
            }

            return BadRequest("Não foi possivel criar o usuario");
        }
        catch
        { 
            return StatusCode(StatusCodes.Status500InternalServerError, "Erro ao salvar aluno");
        }
    }
    
}