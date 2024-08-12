using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using FluentValidation;
using MyAspNetCoreApp.DTOs;
using MyAspNetCoreApp.Interfaces;
using MyAspNetCoreApp.Models;

namespace MyAspNetCoreApp.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;

        public BookService(IBookRepository bookRepository, IMapper mapper)
        {
            _bookRepository = bookRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<BookDto>> GetAllBooksAsync()
        {
            var books = await _bookRepository.GetAllBooksAsync();
            return _mapper.Map<IEnumerable<BookDto>>(books);
        }

        public async Task<BookDto> GetBookByIdAsync(int id)
        {
            var book = await _bookRepository.GetBookByIdAsync(id);
            return _mapper.Map<BookDto>(book);
        }

        public async Task<BookDto> AddBookAsync(BookAddDto bookAddDto)
        {
            var book = _mapper.Map<Book>(bookAddDto);
            var addedBook = await _bookRepository.AddBookAsync(book);
            return _mapper.Map<BookDto>(addedBook);
        }

        public async Task<BookDto> UpdateBookAsync(int id, BookUpdateDto bookUpdateDto)
        {
            var existingBook = await _bookRepository.GetBookByIdAsync(id);
            if (existingBook == null)
            {
                throw new KeyNotFoundException($"Book with id {id} not found.");
            }

            _mapper.Map(bookUpdateDto, existingBook);
            var updatedBook = await _bookRepository.UpdateBookAsync(existingBook);
            return _mapper.Map<BookDto>(updatedBook);
        }

        public async Task<bool> DeleteBookAsync(int id)
        {
            return await _bookRepository.DeleteBookAsync(id);
        }

        public async Task<IEnumerable<BookDto>> SearchBooksAsync(string searchTerm)
        {
            var books = await _bookRepository.SearchBooksAsync(searchTerm);
            return _mapper.Map<IEnumerable<BookDto>>(books);
        }
    }
}
