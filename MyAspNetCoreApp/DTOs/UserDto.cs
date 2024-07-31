using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAspNetCoreApp.DTOs
{
    public class UserDto
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Token { get; set; }
    }
}
