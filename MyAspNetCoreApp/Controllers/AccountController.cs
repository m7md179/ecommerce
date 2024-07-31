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
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IUserRepository _userRepository;

        public AccountController(
            UserManager<AppUser> userManager,
            SignInManager<AppUser> signInManager,
            ITokenService tokenService,
            IUserRepository userRepository
        )
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _userRepository = userRepository;
        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await _userRepository.GetUserByEmailAsync(registerDto.Email) != null)
                return BadRequest("Email is taken");

            var user = new AppUser
            {
                Email = registerDto.Email,
                UserName = registerDto.Email,
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName
            };

            var result = await _userManager.CreateAsync(user, registerDto.Password);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = _tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userRepository.GetUserByEmailAsync(loginDto.Email);

            if (user == null)
                return Unauthorized("Invalid email");

            var result = await _signInManager.CheckPasswordSignInAsync(
                user,
                loginDto.Password,
                false
            );

            if (!result.Succeeded)
                return Unauthorized();

            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Token = _tokenService.CreateToken(user)
            };
        }
    }
}
