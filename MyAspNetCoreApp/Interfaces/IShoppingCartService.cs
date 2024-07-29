using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyAspNetCoreApp.DTOs;

namespace MyAspNetCoreApp.Interfaces
{
    public interface IShoppingCartService
    {
        Task<ShoppingCartDto> GetCartByUserIdAsync(string userId);

        Task AddToCartAsync(string userId, ShoppingCartItemDto itemDto);

        Task RemoveFromCartAsync(string userId, int itemId);

        Task ClearCartAsync(string userId);
    }
}
