using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(UserManager<AppUser> userManager,
            RoleManager<AppRole> roleManager)
        {
            if (await userManager.Users.AnyAsync()) return;

            var roles = new List<AppRole>
            {
                new AppRole{Name = "User"},
                new AppRole{Name = "Admin"},
                new AppRole{Name = "Moderator"},
            };

            foreach (var role in roles)
            {
                await roleManager.CreateAsync(role);
            }

            var test1 = new AppUser
            {
                UserName = "test1",
                Email = "syedmurtazas19@gmail.com",
                EmailConfirmed = true
            };
            var test2 = new AppUser
            {
                UserName = "test2",
                Email = "syedmurtazas19@gmail.com",
                EmailConfirmed = true
            };
            var test3 = new AppUser
            {
                UserName = "test3",
                Email = "syedmurtazas19@gmail.com",
                EmailConfirmed = true
            };

            var admin = new AppUser
            {
                UserName = "admin",
                Email = "syedmurtazas19@gmail.com",
                EmailConfirmed = true
            };

            await userManager.CreateAsync(test1, "Pa$$w0rd");
            await userManager.AddToRolesAsync(test1, new[] { "User" });
            await userManager.CreateAsync(test2, "Pa$$w0rd");
            await userManager.AddToRolesAsync(test2, new[] { "User" });
            await userManager.CreateAsync(test3, "Pa$$w0rd");
            await userManager.AddToRolesAsync(test3, new[] { "User" });
            await userManager.CreateAsync(admin, "Pa$$w0rd");
            await userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" });
        }
    }
}