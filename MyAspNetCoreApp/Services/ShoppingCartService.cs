using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MyAspNetCoreApp.DTOs;
using MyAspNetCoreApp.Interfaces;
using MyAspNetCoreApp.Models;

namespace MyAspNetCoreApp.Services
{
    public class ShoppingCartService : IShoppingCartService
    {
        private readonly IShoppingCartRepository _shoppingCartRepository;

        public ShoppingCartService(IShoppingCartRepository shoppingCartRepository)
        {
            _shoppingCartRepository = shoppingCartRepository;
        }

        public async Task<ShoppingCartDto> GetCartByUserIdAsync(string userId)
        {
            var cart = await _shoppingCartRepository.GetCartByUserIdAsync(userId);
            if (cart == null)
                return null;

            return new ShoppingCartDto
            {
                Items = cart
                    .Items.Select(i => new ShoppingCartItemDto
                    {
                        BookId = i.BookId,
                        Quantity = i.Quantity,
                        Price = i.Price
                    })
                    .ToList()
            };
        }

        public async Task AddItemToCartAsync(string userId, ShoppingCartItemDto itemDto)
        {
            await _shoppingCartRepository.AddItemToCartAsync(
                userId,
                itemDto.BookId,
                itemDto.Quantity
            );
        }

        public async Task RemoveItemFromCartAsync(string userId, int bookId)
        {
            await _shoppingCartRepository.RemoveItemFromCartAsync(userId, bookId);
        }

        public async Task ClearCartAsync(string userId)
        {
            await _shoppingCartRepository.ClearCartAsync(userId);
        }

        public async Task UpdateCartItemQuantityAsync(string userId, ShoppingCartItemDto itemDto)
        {
            await _shoppingCartRepository.UpdateCartItemQuantityAsync(
                userId,
                itemDto.BookId,
                itemDto.Quantity
            );
        }
    }
}
