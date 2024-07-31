using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyAspNetCoreApp.DTOs;
using MyAspNetCoreApp.Interfaces;

namespace MyAspNetCoreApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class BooksController : ControllerBase
    {
        private readonly IBookService _bookService;

        public BooksController(IBookService bookService)
        {
            _bookService = bookService;
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
        public async Task<ActionResult<BookDto>> AddBook([FromBody] BookDto bookDto)
        {
            var addedBook = await _bookService.AddBookAsync(bookDto);
            return CreatedAtAction(nameof(GetBookById), new { id = addedBook.Id }, addedBook);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBook(int id, [FromBody] BookDto bookDto)
        {
            try
            {
                var updatedBook = await _bookService.UpdateBookAsync(id, bookDto);
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
    }
}
