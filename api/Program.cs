
using System.Security.Claims;
using System.Text;
using api.Context;
using api.Models;
using api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

//Busca Chave do arquivo AppSettings
var key = Encoding.ASCII.GetBytes(builder.Configuration["JwtSettings:SecretKey"]);
JwtConfig(builder);
AuthorizationConfig(builder);
ConfigureServices(builder);

var app = builder.Build();
app.UseCors("PermitirFrontend");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();


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
        options.AddPolicy("Admin", policy => policy.RequireRole(Roles.Admin.ToString()));
        options.AddPolicy("Normal", policy => policy.RequireRole(Roles.Normal.ToString()));
    });
}

void ConfigureServices(WebApplicationBuilder builder)
{
    builder.Services.AddCors(options=>{
        options.AddPolicy("PermitirFrontend",policy=>{
            policy.WithOrigins("http://localhost:5173","http://localhost:5174")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    });
    
    builder.Services.AddDbContext<AppDbContext>(options =>
    {
        options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
    });
    
    builder.Services.AddScoped<IUserService, UserService>();
    
    builder.Services.AddControllers();
}

