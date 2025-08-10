using api.Context;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Services;

public class UserService : IUserService
{
    
    private readonly AppDbContext _context;

    public UserService(AppDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<User>> FindAll()
    {
        try
        {
            return await _context.Users.AsNoTracking().ToListAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return Enumerable.Empty<User>();
        }
    }

    public async Task<User> FindById(int id)
    {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);
            if (user != null)
            {
                return user;
            }
            throw new Exception("Usuário não encontrado.");
    }

    public async Task<User?> FindByEmail(string email)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email);
        if(user == null)
            throw new Exception("Usuário não encontrado.");
        return user;
    }

    public async Task<User> FindByEmailAndPassword(string email, string password)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == email && u.Password == password);
        if  (user != null)
            return user;
        return null;
    }
    
    public async Task Insert(User user)
    {
        try
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
        }
    }

    public async Task Update(User user, int id)
    {
        var existingUser = await _context.Users.FindAsync(id);
        if (existingUser == null)
            throw new Exception("Usuário não encontrado.");
        
        existingUser.Email = user.Email;
        existingUser.Password = user.Password;
        existingUser.Role = user.Role;

        _context.Users.Update(existingUser);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(int id)
    {
        var user = await _context.Users.FindAsync(id);
        if (user == null)
            throw new Exception("Usuário não encontrado.");

        _context.Users.Remove(user);
        await _context.SaveChangesAsync();
    }
}