using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyAspNetCoreApp.DTOs;
using MyAspNetCoreApp.Models;

namespace MyAspNetCoreApp.Interfaces
{
    public interface IAuthServices
    {
        Task<AppUserDto> Authenticate(AppUser user);
    }
}
