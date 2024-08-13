using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyAspNetCoreApp.Models;

namespace MyAspNetCoreApp.Interfaces
{
    public interface IShoppingCartRepository
    {
        Task<ShoppingCart> GetCartByUserIdAsync(string userId);
        Task AddItemToCartAsync(string userId, int bookId, int quantity);
        Task RemoveItemFromCartAsync(string userId, int bookId);
        Task ClearCartAsync(string userId);
        Task UpdateCartItemQuantityAsync(string userId, int bookId, int quantity);
    }
}
