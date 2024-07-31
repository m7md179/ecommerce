using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using MyAspNetCoreApp.DTOs;
using MyAspNetCoreApp.Models;

namespace MyAspNetCoreApp.Mapper
{
    public class BookMapper : Profile
    {
        public BookMapper()
        {
            CreateMap<Book, BookDto>();
            // .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            // .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
            // .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.Author))
            // .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
            // .ForMember(dest => dest.ISBN, opt => opt.MapFrom(src => src.ISBN))
            // .ForMember(dest => dest.Stock, opt => opt.MapFrom(src => src.Stock));

            CreateMap<BookDto, Book>();
            // .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            // .ForMember(dest => dest.Title, opt => opt.MapFrom(src => src.Title))
            // .ForMember(dest => dest.Author, opt => opt.MapFrom(src => src.Author))
            // .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
            // .ForMember(dest => dest.ISBN, opt => opt.MapFrom(src => src.ISBN))
            // .ForMember(dest => dest.Stock, opt => opt.MapFrom(src => src.Stock));

            CreateMap<Book, BookAddDto>();
            CreateMap<BookAddDto, Book>();
            CreateMap<BookDto, BookAddDto>();
            CreateMap<BookAddDto, BookDto>();
            CreateMap<Book, BookUpdateDto>();
            CreateMap<BookUpdateDto, Book>();
            CreateMap<BookDto, BookUpdateDto>();
            CreateMap<BookUpdateDto, BookDto>();
        }
    }
}
