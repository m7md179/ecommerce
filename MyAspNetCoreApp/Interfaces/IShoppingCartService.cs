using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyAspNetCoreApp.DTOs;

namespace MyAspNetCoreApp.Interfaces
{
    public class IShoppingCartService
    {
        Task<ShoppingCartDto> GetCartByUserIdAsync(string userId);

        Task AddToCartAsync(string userId, ShoppingCartItemDto itemDto);

        Task RemoveFromCartAsync(string userId, int itemId);

        Task ClearCartAsync(string userId);
    }
}
