using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FluentValidation;
using MyAspNetCoreApp.DTOs;

namespace MyAspNetCoreApp.Validator
{
    public class BookDtoValidator : AbstractValidator<BookDto>
    {
        public BookDtoValidator()
        {
            RuleFor(x => x.Title).NotEmpty().MaximumLength(200);
            RuleFor(x => x.Author).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Price).GreaterThan(0);
            // RuleFor(x => x.ISBN).NotEmpty().Matches(@"^\d{10}|\d{13}$");
            RuleFor(x => x.Stock).GreaterThanOrEqualTo(0);
        }
    }
}
