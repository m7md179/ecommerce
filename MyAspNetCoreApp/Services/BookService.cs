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
        private readonly IValidator<BookDto> _validator;

        public BookService(
            IBookRepository bookRepository,
            IMapper mapper,
            IValidator<BookDto> validator
        )
        {
            _bookRepository = bookRepository;
            _mapper = mapper;
            _validator = validator;
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

        public async Task<BookDto> AddBookAsync(BookDto bookDto)
        {
            await _validator.ValidateAndThrowAsync(bookDto);
            var book = _mapper.Map<Book>(bookDto);
            var addedBook = await _bookRepository.AddBookAsync(book);
            return _mapper.Map<BookDto>(addedBook);
        }

        public async Task<BookDto> UpdateBookAsync(int id, BookDto bookDto)
        {
            await _validator.ValidateAndThrowAsync(bookDto);
            if (id != bookDto.Id)
                throw new ArgumentException("Id mismatch");

            var book = _mapper.Map<Book>(bookDto);
            var updatedBook = await _bookRepository.UpdateBookAsync(book);
            return _mapper.Map<BookDto>(updatedBook);
        }

        public async Task<bool> DeleteBookAsync(int id)
        {
            return await _bookRepository.DeleteBookAsync(id);
        }
    }
}
