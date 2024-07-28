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

        public async Task<ShoppingCart> GetCartByUserIdAsync(string userId)
        {
            return await _context
                .ShoppingCarts.Include(c => c.Items)
                .ThenInclude(i => i.Book)
                .FirstOrDefaultAsync(c => c.UserId == userId);
        }

        public async Task AddToCartAsync(string userId, ShoppingCartItem item)
        {
            var cart = await GetCartByUserIdAsync(userId);
            if (cart == null)
            {
                cart = new ShoppingCart { UserId = userId };
                await _context.ShoppingCarts.AddAsync(cart);
            }
            cart.Items.Add(item);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveFromCartAsync(string userId, int itemId)
        {
            var cart = await GetCartByUserIdAsync(userId);
            if (cart != null)
            {
                var item = cart.Items.FirstOrDefault(i => i.Id == itemId);
                if (item != null)
                {
                    cart.Items.Remove(item);
                    await _context.SaveChangesAsync();
                }
            }
        }

        public async Task ClearCartAsync(string userId)
        {
            var cart = await GetCartByUserIdAsync(userId);
            if (cart != null)
            {
                _context.ShoppingCarts.Remove(cart);
                await _context.SaveChangesAsync();
            }
        }
    }
}
