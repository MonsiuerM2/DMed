using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace API.Entities
{
    public class AppUser : IdentityUser<int>
    {
        public string Name { get; set; }
        new public string Email { get; set; }
        new public bool EmailConfirmed { get; set; }
        public string EmailVerificationToken { get; set; }
        public ICollection<AppUserRole> UserRoles { get; set; }
    }
}