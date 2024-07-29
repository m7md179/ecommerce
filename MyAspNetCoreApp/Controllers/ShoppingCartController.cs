using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyAspNetCoreApp.DTOs;
using MyAspNetCoreApp.Interfaces;

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
        public async Task<IActionResult> GetCart(string userId)
        {
            var cart = await _shoppingCartService.GetCartByUserIdAsync(userId);
            return Ok(cart);
        }

        [HttpPost("{userId}/items")]
        public async Task<IActionResult> AddToCart(
            string userId,
            [FromBody] ShoppingCartItemDto itemDto
        )
        {
            await _shoppingCartService.AddToCartAsync(userId, itemDto);
            return NoContent();
        }

        [HttpDelete("{userId}/items/{itemId}")]
        public async Task<IActionResult> RemoveFromCart(string userId, int itemId)
        {
            await _shoppingCartService.RemoveFromCartAsync(userId, itemId);
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
