using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyAspNetCoreApp.Models;

namespace MyAspNetCoreApp.Interfaces
{
    public class IShoppingCartRepository
    {
        Task<ShoppingCart> GetCartByUserIdAsync(string userId);

        Task AddToCartAsync(string userId, ShoppingCartItem item);

        Task RemoveFromCartAsync(string userId, int itemId);

        Task ClearCartAsync(string userId);
    }
}
