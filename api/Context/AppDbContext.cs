using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Context;

public class AppDbContext:DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
        
    }
    
    public DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>().HasIndex(u => u.Email).IsUnique();
        
        //Seed Users
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Email = "artur@teste.com",
                Password = "123456",
                Role = Roles.Admin
            },
            new User
            {
                Id = 2,
                Email = "carol@teste.com",
                Password = "123456",
                Role = Roles.Normal
            });
    }
}