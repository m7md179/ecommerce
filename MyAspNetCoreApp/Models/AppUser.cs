using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace MyAspNetCoreApp.Models
{
    public class AppUser
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
