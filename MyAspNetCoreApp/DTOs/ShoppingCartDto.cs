using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAspNetCoreApp.DTOs
{
    public class ShoppingCartDto
    {
        public int Id { get; set; }
        public List<ShoppingCartItemDto> Items { get; set; }
    }
}
