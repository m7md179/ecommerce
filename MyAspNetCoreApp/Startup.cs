// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Text;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.IdentityModel.Tokens;
// using MyAspNetCoreApp.Data;
// using MyAspNetCoreApp.Interfaces;
// using MyAspNetCoreApp.Repositories;
// using MyAspNetCoreApp.Services;

// namespace MyAspNetCoreApp
// {
//     public class Startup
//     {
//         public Startup(IConfiguration configuration)
//         {
//             Configuration = configuration;
//         }

//         public IConfiguration Configuration { get; }

//         // This method gets called by the runtime. Use this method to add services to the container.
//         public void ConfigureServices(IServiceCollection services)
//         {
//             services.AddControllers();
//             services.AddDbContext<ApplicationDbContext>(options =>
//                 options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"))
//             );
//             services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
//             services.AddScoped<IBookRepository, BookRepository>();
//             services.AddScoped<IBookService, BookService>();
//             services.AddScoped<IShoppingCartRepository, ShoppingCartRepository>();
//             services.AddScoped<IShoppingCartService, ShoppingCartService>();
//             services.AddScoped<IAuthServices, AuthServices>();

//             services
//                 .AddAuthentication(options =>
//                 {
//                     options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//                     options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//                 })
//                 .AddJwtBearer(options =>
//                 {
//                     options.TokenValidationParameters = new TokenValidationParameters
//                     {
//                         ValidateIssuer = true,
//                         ValidateAudience = true,
//                         ValidateLifetime = true,
//                         ValidateIssuerSigningKey = true,
//                         ValidIssuer = Configuration["Jwt:Issuer"],
//                         ValidAudience = Configuration["Jwt:Audience"],
//                         IssuerSigningKey = new SymmetricSecurityKey(
//                             Encoding.UTF8.GetBytes(Configuration["Jwt:Key"])
//                         )
//                     };
//                 });

//             services.AddAuthorization();
//         }

//         // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
//         public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
//         {
//             if (env.IsDevelopment())
//             {
//                 app.UseDeveloperExceptionPage();
//             }
//             else
//             {
//                 app.UseExceptionHandler("/Home/Error");
//                 app.UseHsts();
//             }

//             app.UseHttpsRedirection();
//             app.UseRouting();

//             app.UseAuthentication();
//             app.UseAuthorization();

//             app.UseEndpoints(endpoints =>
//             {
//                 endpoints.MapControllers();
//             });
//         }
//     }
// }
