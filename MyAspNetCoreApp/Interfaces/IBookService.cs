using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MyAspNetCoreApp.DTOs;

namespace MyAspNetCoreApp.Interfaces
{
    public interface IBookService
    {
        Task<IEnumerable<BookDto>> GetAllBooksAsync();
        Task<BookDto> GetBookByIdAsync(int id);
        Task<BookDto> AddBookAsync(BookDto bookDto);
        Task<BookDto> UpdateBookAsync(int id, BookDto bookDto);
        Task<bool> DeleteBookAsync(int id);
    }
}
