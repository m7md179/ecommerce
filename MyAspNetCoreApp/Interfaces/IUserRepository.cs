using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyAspNetCoreApp.Models;

namespace MyAspNetCoreApp.Interfaces
{
    public interface IUserRepository
    {
        Task<AppUser> GetUserByEmailAsync(string email);
        Task<AppUser> GetUserByIdAsync(string id);
    }
}
