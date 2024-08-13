using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyAspNetCoreApp.Data;
using MyAspNetCoreApp.Interfaces;
using MyAspNetCoreApp.Models;

namespace MyAspNetCoreApp.Repositories
{
    public class ShoppingCartRepository : IShoppingCartRepository
    {
        private readonly ApplicationDbContext _context;

        public ShoppingCartRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ShoppingCart> GetByUserIdAsync(string userId)
        {
            return await _context
                .ShoppingCarts.Include(c => c.Items)
                .FirstOrDefaultAsync(c => c.AppUserId == userId);
        }

        public async Task AddItemAsync(string userId, int productId, int quantity)
        {
            var cart = await GetByUserIdAsync(userId);
            if (cart == null)
            {
                cart = new ShoppingCart { AppUserId = userId };
                _context.ShoppingCarts.Add(cart);
            }

            var item = cart.Items.FirstOrDefault(i => i.ProductId == productId);
            if (item == null)
            {
                item = new ShoppingCartItem { ProductId = productId, Quantity = quantity };
                cart.Items.Add(item);
            }
            else
            {
                item.Quantity += quantity;
            }

            await _context.SaveChangesAsync();
        }

        public async Task RemoveItemAsync(string userId, int productId)
        {
            var cart = await GetByUserIdAsync(userId);
            var item = cart?.Items.FirstOrDefault(i => i.ProductId == productId);
            if (item != null)
            {
                cart.Items.Remove(item);
                await _context.SaveChangesAsync();
            }
        }

        public async Task UpdateItemQuantityAsync(string userId, int productId, int quantity)
        {
            var cart = await GetByUserIdAsync(userId);
            var item = cart?.Items.FirstOrDefault(i => i.ProductId == productId);
            if (item != null)
            {
                item.Quantity = quantity;
                await _context.SaveChangesAsync();
            }
        }

        public async Task<ShoppingCart> SaveAsync(ShoppingCart cart)
        {
            if (cart.Id == 0)
                _context.ShoppingCarts.Add(cart);
            else
                _context.ShoppingCarts.Update(cart);

            await _context.SaveChangesAsync();
            return cart;
        }
    }
}
