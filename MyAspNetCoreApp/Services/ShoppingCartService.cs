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
        private readonly IShoppingCartRepository _repository;
        private readonly IMapper _mapper;

        public ShoppingCartService(IShoppingCartRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<ShoppingCartDto> GetCartAsync(string userId)
        {
            var cart = await _repository.GetByUserIdAsync(userId);
            return _mapper.Map<ShoppingCartDto>(cart);
        }

        public async Task AddItemToCartAsync(string userId, int productId, int quantity)
        {
            await _repository.AddItemAsync(userId, productId, quantity);
        }

        public async Task RemoveItemFromCartAsync(string userId, int productId)
        {
            await _repository.RemoveItemAsync(userId, productId);
        }

        public async Task UpdateItemQuantityAsync(string userId, int productId, int quantity)
        {
            await _repository.UpdateItemQuantityAsync(userId, productId, quantity);
        }
    }
}
