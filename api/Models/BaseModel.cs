using System.ComponentModel.DataAnnotations;

namespace api.Models;

public abstract class BaseModel
{
    [Key]
    public int Id {get;set;}
}