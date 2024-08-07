using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MyAspNetCoreApp.DTOs;
using MyAspNetCoreApp.Models;

namespace MyAspNetCoreApp.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<ShoppingCart, ShoppingCartDto>();
            CreateMap<ShoppingCartItem, ShoppingCartItemDto>();
        }
    }
}
