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

        public async Task AddItemToCartAsync(string userId, int bookId, int quantity)
        {
            var cart = await GetCartByUserIdAsync(userId);

            if (cart == null)
            {
                cart = new ShoppingCart { UserId = userId };
                _context.ShoppingCarts.Add(cart);
            }

            var cartItem = cart.Items.FirstOrDefault(i => i.BookId == bookId);
            if (cartItem == null)
            {
                var book = await _context.Books.FindAsync(bookId);
                cartItem = new ShoppingCartItem
                {
                    BookId = bookId,
                    Quantity = quantity,
                    Price = book.Price,
                    Book = book
                };
                cart.Items.Add(cartItem);
            }
            else
            {
                cartItem.Quantity += quantity;
            }

            await _context.SaveChangesAsync();
        }

        public async Task RemoveItemFromCartAsync(string userId, int bookId)
        {
            var cart = await GetCartByUserIdAsync(userId);
            if (cart == null)
                return;

            var cartItem = cart.Items.FirstOrDefault(i => i.BookId == bookId);
            if (cartItem != null)
            {
                cart.Items.Remove(cartItem);
                await _context.SaveChangesAsync();
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

        public async Task UpdateCartItemQuantityAsync(string userId, int bookId, int quantity)
        {
            var cart = await GetCartByUserIdAsync(userId);
            if (cart == null)
                return;

            var cartItem = cart.Items.FirstOrDefault(i => i.BookId == bookId);
            if (cartItem != null)
            {
                cartItem.Quantity = quantity;
                await _context.SaveChangesAsync();
            }
        }
    }
}
