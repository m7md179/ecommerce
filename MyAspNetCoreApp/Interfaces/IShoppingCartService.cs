using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyAspNetCoreApp.DTOs;

namespace MyAspNetCoreApp.Interfaces
{
    public interface IShoppingCartService
    {
        Task<ShoppingCartDto> GetCartAsync(string userId);
        Task AddItemToCartAsync(string userId, int productId, int quantity);
        Task RemoveItemFromCartAsync(string userId, int productId);
        Task UpdateItemQuantityAsync(string userId, int productId, int quantity);
    }
}
