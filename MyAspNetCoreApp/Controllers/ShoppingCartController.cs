using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        private readonly UserManager<AppUser> _userManager;

        public ShoppingCartController(
            IShoppingCartService shoppingCartService,
            UserManager<AppUser> userManager
        )
        {
            _shoppingCartService = shoppingCartService;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<ActionResult<ShoppingCartDto>> GetCart()
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return Unauthorized();

            var cart = await _shoppingCartService.GetCartAsync(user.Id);
            return Ok(cart);
        }

        [HttpPost("items")]
        public async Task<IActionResult> AddItemToCart([FromBody] AddItemRequest request)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return Unauthorized();

            await _shoppingCartService.AddItemToCartAsync(
                user.Id,
                request.ProductId,
                request.Quantity
            );
            return Ok();
        }

        [HttpDelete("items/{productId}")]
        public async Task<IActionResult> RemoveItemFromCart(int productId)
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return Unauthorized();

            await _shoppingCartService.RemoveItemFromCartAsync(user.Id, productId);
            return Ok();
        }

        [HttpPut("items/{productId}")]
        public async Task<IActionResult> UpdateItemQuantity(
            int productId,
            [FromBody] UpdateQuantityRequest request
        )
        {
            var user = await _userManager.GetUserAsync(User);
            if (user == null)
                return Unauthorized();

            await _shoppingCartService.UpdateItemQuantityAsync(
                user.Id,
                productId,
                request.Quantity
            );
            return Ok();
        }
    }

    public class AddItemRequest
    {
        public int ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class UpdateQuantityRequest
    {
        public int Quantity { get; set; }
    }
}
