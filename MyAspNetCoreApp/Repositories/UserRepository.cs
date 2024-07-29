using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyAspNetCoreApp.Data;
using MyAspNetCoreApp.Interfaces;
using MyAspNetCoreApp.Models;

namespace MyAspNetCoreApp.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<AppUser> GetUserByEmailAsync(string email)
        {
            return await _context.Users.SingleOrDefaultAsync(u => u.Email == email);
        }

        public async Task<AppUser> GetUserByIdAsync(string id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}
