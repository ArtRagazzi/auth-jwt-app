using api.Models;

namespace api.Repositories;

public static class UserRepository{
    public static User FindByEmailAndPassword(string email, string password){
        
        var users = new List<User>{
            new User{Id = 1, Email="john@email.com" ,Password="qwe123",Role="admin"},
            new User{Id = 2, Email="maryjane@email.com" ,Password="qwe321",Role="normal"},
        };
        
        return users.Where(x=> x.Email == email && x.Password == password).FirstOrDefault();
    }
}