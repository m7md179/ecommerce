using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using MyAspNetCoreApp.DTOs;
using MyAspNetCoreApp.Interfaces;
using MyAspNetCoreApp.Models;

namespace MyAspNetCoreApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShoppingCartController : ControllerBase
    {
        private readonly IShoppingCartService _shoppingCartService;

        public ShoppingCartController(IShoppingCartService shoppingCartService)
        {
            _shoppingCartService = shoppingCartService;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<ShoppingCartDto>> GetCart(string userId)
        {
            var cart = await _shoppingCartService.GetCartByUserIdAsync(userId);
            if (cart == null)
                return NotFound();
            return Ok(cart);
        }

        [HttpPost("{userId}/items")]
        public async Task<IActionResult> AddItem(string userId, ShoppingCartItemDto itemDto)
        {
            await _shoppingCartService.AddItemToCartAsync(userId, itemDto);
            return NoContent();
        }

        [HttpPut("{userId}/items")]
        public async Task<IActionResult> UpdateItemQuantity(
            string userId,
            ShoppingCartItemDto itemDto
        )
        {
            await _shoppingCartService.UpdateCartItemQuantityAsync(userId, itemDto);
            return NoContent();
        }

        [HttpDelete("{userId}/items/{bookId}")]
        public async Task<IActionResult> RemoveItem(string userId, int bookId)
        {
            await _shoppingCartService.RemoveItemFromCartAsync(userId, bookId);
            return NoContent();
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> ClearCart(string userId)
        {
            await _shoppingCartService.ClearCartAsync(userId);
            return NoContent();
        }
    }
}
