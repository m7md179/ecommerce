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
        Task AddItemToCartAsync(string userId, ShoppingCartItemDto itemDto);
        Task RemoveItemFromCartAsync(string userId, int bookId);
        Task ClearCartAsync(string userId);
        Task UpdateCartItemQuantityAsync(string userId, ShoppingCartItemDto itemDto);
    }
}
