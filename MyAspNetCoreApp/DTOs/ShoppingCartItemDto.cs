using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MyAspNetCoreApp.DTOs
{
    public class ShoppingCartItemDto
    {
        public int BookId { get; set; }
        public int Quantity { get; set; }
    }
}
