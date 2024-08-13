using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyAspNetCoreApp.DTOs;
using MyAspNetCoreApp.Interfaces;

namespace MyAspNetCoreApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    // [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;
        private readonly IMapper _mapper;

        public BooksController(IBookService bookService, IMapper mapper)
        {
            _bookService = bookService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookDto>>> GetAllBooks()
        {
            var books = await _bookService.GetAllBooksAsync();
            return Ok(books);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BookDto>> GetBookById(int id)
        {
            var book = await _bookService.GetBookByIdAsync(id);
            if (book == null)
                return NotFound();
            return Ok(book);
        }

        [HttpPost]
        public async Task<ActionResult<BookDto>> AddBook([FromBody] BookAddDto bookAddDto)
        {
            var addedBook = _mapper.Map<BookDto>(bookAddDto);
            await _bookService.AddBookAsync(bookAddDto);
            var bookAdd = _mapper.Map<BookAddDto>(addedBook);
            return CreatedAtAction(nameof(GetBookById), new { id = addedBook.Id }, bookAdd);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] BookUpdateDto bookUpdateDto)
        {
            try
            {
                var updatedBook = await _bookService.UpdateBookAsync(id, bookUpdateDto);
                return Ok(updatedBook);
            }
            catch (ArgumentException)
            {
                return BadRequest("Id mismatch");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBook(int id)
        {
            var result = await _bookService.DeleteBookAsync(id);
            if (!result)
                return NotFound();
            return NoContent();
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<BookDto>>> SearchBooks(
            [FromQuery] string searchTerm
        )
        {
            var books = await _bookService.SearchBooksAsync(searchTerm);
            return Ok(books);
        }
    }
}
