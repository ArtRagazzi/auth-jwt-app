using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace api.Models;


[Table("tb_users")]
public class User : BaseModel{
   
    [Required]
    [StringLength(80)]
    [EmailAddress]
    public string Email {get;set;}
    [Required]
    public string Password {get;set;}

    public Roles Role { get; set; } = Roles.Normal;


}