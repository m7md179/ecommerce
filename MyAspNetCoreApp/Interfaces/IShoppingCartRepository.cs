using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyAspNetCoreApp.Models;

namespace MyAspNetCoreApp.Interfaces
{
    public interface IShoppingCartRepository
    {
        Task<ShoppingCart> GetByUserIdAsync(string userId);
        Task AddItemAsync(string userId, int productId, int quantity);
        Task RemoveItemAsync(string userId, int productId);
        Task UpdateItemQuantityAsync(string userId, int productId, int quantity);
        Task<ShoppingCart> SaveAsync(ShoppingCart cart);
    }
}
