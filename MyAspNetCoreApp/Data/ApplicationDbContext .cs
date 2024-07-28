using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using MyAspNetCoreApp.Models;

namespace MyAspNetCoreApp.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<Book> Books { get; set; }
        // public DbSet<Category> Categories { get; set; }
        // public DbSet<Product> Products { get; set; }
        // public DbSet<ShoppingCart> ShoppingCarts { get; set; }
        // public DbSet<ShoppingCartItem> ShoppingCartItems { get; set; }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     base.OnModelCreating(modelBuilder);

        //     // Configure the relationship between Category and Product
        //     modelBuilder
        //         .Entity<Category>()
        //         .HasMany(c => c.Products)
        //         .WithOne(p => p.Category)
        //         .HasForeignKey(p => p.CategoryId);

        //     // Configure the relationship between ShoppingCart and ShoppingCartItem
        //     modelBuilder
        //         .Entity<ShoppingCart>()
        //         .HasMany(s => s.Items)
        //         .WithOne(i => i.shoppingCart)
        //         .HasForeignKey(i => i.shoppingCartId);

        //     // Configure the relationship between ShoppingCartItem and Product
        //     modelBuilder
        //         .Entity<ShoppingCartItem>()
        //         .HasOne(i => i.Product)
        //         .WithMany()
        //         .HasForeignKey(i => i.ProductId);

        //     // Configure the primary key for IdentityUserLogin<string>
        //     modelBuilder.Entity<IdentityUserLogin<string>>(entity =>
        //     {
        //         entity.HasKey(l => new { l.LoginProvider, l.ProviderKey });
        //     });

        //     // Configure the primary key for IdentityUserRole<string>
        //     modelBuilder.Entity<IdentityUserRole<string>>(entity =>
        //     {
        //         entity.HasKey(r => new { r.UserId, r.RoleId });
        //     });

        //     // Configure the primary key for IdentityUserToken<string>
        //     modelBuilder.Entity<IdentityUserToken<string>>(entity =>
        //     {
        //         entity.HasKey(t => new
        //         {
        //             t.UserId,
        //             t.LoginProvider,
        //             t.Name
        //         });
        //     });
        // }
    }
}
