
using System.Security.Claims;
using System.Text;
using api.Models;
using api.Repositories;
using api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

//Busca Chave do arquivo AppSettings
var key = Encoding.ASCII.GetBytes(builder.Configuration["JwtSettings:SecretKey"]);
JwtConfig(builder);
AuthorizationConfig(builder);

var app = builder.Build();
app.UseAuthentication();
app.UseAuthorization();


app.MapPost("/login", (User model)=>{
    var user = UserRepository.FindByEmailAndPassword(model.Email, model.Password);

    if(user == null){
        return Results.NotFound(new {
            message = "Invalid email or password"
        });
    }

    var token = TokenService.GenerateToken(user, builder.Configuration["JwtSettings:SecretKey"]);
    user.Password = "";

    return Results.Ok(new {
        user = user,
        token = token
    });
});

app.MapGet("anonymous", () =>
{
    Results.Ok(new {message = "Qualquer um pode acessar sem Authenticação"});
}).AllowAnonymous();

app.MapGet("authenticated", (ClaimsPrincipal user) =>
{
    Results.Ok(new {message = $"Somente Usuarios autenticados podem acessar!\nUser logado:{user.Identity.Name}"});
}).RequireAuthorization();
    

app.MapGet("authenticated-admin", (ClaimsPrincipal user) =>
{
    Results.Ok(new {message = $"Somente Usuarios autenticados com role admin podem acessar!\nUser logado:{user.Identity.Name}"});
}).RequireAuthorization("Admin");




app.Run();




void JwtConfig(WebApplicationBuilder builder)
{
    // Adiciona o serviço de autenticação ao container de dependência
    builder.Services.AddAuthentication(x =>
        {
            // Define o esquema padrão para autenticação como JWT
            x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;

            // Define o esquema padrão para desafios (ex: quando o usuário não está autenticado)
            x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        // Configura o middleware JWT Bearer
        .AddJwtBearer(x =>
        {
            // Desativa a exigência de HTTPS (use true em produção)
            x.RequireHttpsMetadata = false;

            // Salva o token no contexto de autenticação
            x.SaveToken = true;

            // Define os parâmetros de validação do token
            x.TokenValidationParameters = new TokenValidationParameters
            {
                // Valida a chave de assinatura do token
                ValidateIssuerSigningKey = true,

                // Define a chave secreta usada para validar a assinatura do token
                IssuerSigningKey = new SymmetricSecurityKey(key),

                // Desativa a validação do emissor (issuer)
                ValidateIssuer = false,

                // Desativa a validação do público (audience)
                ValidateAudience = false,
            
                // Bloqueia apos acesso apos expirar o token
                ValidateLifetime = true,
            
                //Tolerancia de atraso (Default = 5 Min)
                ClockSkew = TimeSpan.Zero // sem tolerância para atraso

            };
        });
}

void AuthorizationConfig(WebApplicationBuilder builder)
{
    builder.Services.AddAuthorization(options =>
    {
        options.AddPolicy("Admin", policy => policy.RequireRole("admin"));
        options.AddPolicy("Normal", policy => policy.RequireRole("normal"));
    });
}