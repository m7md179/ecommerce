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
        Task<BookDto> AddBookAsync(BookAddDto bookAddDto);
        Task<BookDto> UpdateBookAsync(int id, BookUpdateDto bookUpdateDto);
        Task<bool> DeleteBookAsync(int id);
        Task<IEnumerable<BookDto>> SearchBooksAsync(string searchTerm);
    }
}
