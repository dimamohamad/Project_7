using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_7.DTOs;
using Project_7.Models;
using static Project_7.Shared.ImageSaver;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly MyDbContext _db;
        public ProductsController(MyDbContext db)
        {
            _db = db;
        }


        [HttpGet("/Api/Products/GetAllProducts")]
        public IActionResult GetAll()
        {
            var products = _db.Products.ToList();
            if (products != null)
            {
                return Ok(products);
            }

            return NotFound();
        }

        [HttpGet("/Api/Products/GetProductsById/{id}")]
        public IActionResult Get(int id)
        {

            if (id <= 0)
            {
                return BadRequest();
            }
            var products = _db.Products.Where(p => p.ProductId == id).FirstOrDefault();
            if (products != null)
            {
                return Ok(products);
            }
            return NotFound();
        }

        [HttpDelete("/Api/Products/DeleteProduct/{id}")]
        public IActionResult Delete(int id)
        {
            if (id <= 0)
            {

                return BadRequest();

            }
            var product = _db.Products.Find(id);
            if (product != null)
            {
                _db.Products.Remove(product);
                _db.SaveChanges();
                return NoContent();
            }
            return NotFound();


        }

        [HttpGet("/Api/Products/GetProductsByCategoryId/{id}")]
        public IActionResult GetAction(int id)
        {
            if (id <= 0)
            {
                return BadRequest();

            }
            var category = _db.Categories.Find(id);
            if (category == null) { return NotFound(); }
            var products = _db.Products.Where(p => p.CategoryId == id).ToList();

            if (products != null)
            {
                return Ok(products);

            }
            return NotFound();
        }


        [HttpPost("/Api/Products/AddNewProduct")]
        public IActionResult AddProduct([FromForm] ProductRequestDTO request)
        {


            if (!ModelState.IsValid)
            {

                return BadRequest();

            }
            var products = new Product
            {

                CategoryId = request.CategoryId,
                ProductImage1 = SaveImage(request.ProductImage1),
                ProductImage2 = SaveImage(request.ProductImage2),
                ProductImage3 = SaveImage(request.ProductImage3),
                ProductImage4 = SaveImage(request.ProductImage4),
                ProductImage5 = SaveImage(request.ProductImage5),
                ProductImage6 = SaveImage(request.ProductImage6),
                ProductName = request.ProductName,
                Description = request.Description,
                Visiblity = request.Visiblity,
                Price = request.Price,
                DiscountPercentage = request.DiscountPercentage,
                StockQuantity = request.StockQuantity,
            };
            _db.Products.Add(products);
            _db.SaveChanges();
            return Ok(products);




        }
        [HttpPut("/Api/Products/UpdateOnproduct/{id}")]

        public IActionResult Update([FromForm] ProductRequestDTO response, int id)
        {

            if (id <= 0)
            {
                return BadRequest();
            }
            var product = _db.Products.FirstOrDefault(p => p.ProductId == id);
            if (product != null)
            {

                product.CategoryId = response.CategoryId;
                product.ProductImage1 = SaveImage(response.ProductImage1);
                product.ProductImage2 = SaveImage(response.ProductImage2);
                product.ProductImage3 = SaveImage(response.ProductImage3);
                product.ProductImage4 = SaveImage(response.ProductImage4);
                product.ProductImage5 = SaveImage(response.ProductImage5);
                product.ProductImage6 = SaveImage(response.ProductImage6);
                product.ProductName = response.ProductName;
                product.Description = response.Description;
                product.Visiblity = response.Visiblity;
                product.Price = response.Price;
                product.DiscountPercentage = response.DiscountPercentage;
                product.StockQuantity = response.StockQuantity;



                _db.Products.Update(product);
                _db.SaveChanges();
                return Ok(product);
            }
            return NotFound();

        }



        [HttpGet("GetLatestProducts")]
        public IActionResult GetLatestProducts()
        {
            var products = _db.Products
                .OrderByDescending(p => p.CreatedAt)  
                .Take(9)  
                .ToList();

            if (products == null || products.Count == 0)
            {
                return NotFound("No products found.");
            }

            return Ok(products);
        }
    }




}





























