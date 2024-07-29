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
        private readonly IMapper _mapper;

        public ShoppingCartService(IShoppingCartRepository shoppingCartRepository, IMapper mapper)
        {
            _shoppingCartRepository = shoppingCartRepository;
            _mapper = mapper;
        }

        public async Task<ShoppingCartDto> GetCartByUserIdAsync(string userId)
        {
            var cart = await _shoppingCartRepository.GetCartByUserIdAsync(userId);
            return _mapper.Map<ShoppingCartDto>(cart);
        }

        public async Task AddToCartAsync(string userId, ShoppingCartItemDto itemDto)
        {
            var item = _mapper.Map<ShoppingCartItem>(itemDto);
            await _shoppingCartRepository.AddToCartAsync(userId, item);
        }

        public async Task RemoveFromCartAsync(string userId, int itemId)
        {
            await _shoppingCartRepository.RemoveFromCartAsync(userId, itemId);
        }

        public async Task ClearCartAsync(string userId)
        {
            await _shoppingCartRepository.ClearCartAsync(userId);
        }
    }
}
