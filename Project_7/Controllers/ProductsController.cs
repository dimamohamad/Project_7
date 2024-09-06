using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_7.Models;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly MyDbContext _db;
        public ProductsController(MyDbContext db)
        {
            _db= db;
        }


        [HttpGet("/Api/Products/GetAllProducts")]
        public IActionResult GetAll() {
            var products = _db.Products.ToList();
            if (products != null)
            {
                return Ok(products);
            }

            return NotFound();  
        }

        [HttpGet("/Api/Products/GetProductsById/{id}")]
        public IActionResult Get(int id) {

            if (id <= 0) { 
            return BadRequest();
            }
            var products = _db.Products.Where(p=>p.ProductId==id).FirstOrDefault();
            if (products != null) { 
            return Ok (products);
            }
            return NotFound();
        }

        [HttpDelete("/Api/Products/DeleteProduct/{id}")]
        public IActionResult Delete(int id) {
            if (id <= 0) {

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
        public IActionResult GetAction(int id) {
            if (id <= 0) {
                return BadRequest();

            }
             var category=_db.Categories.Find(id);
            if (category == null) {return NotFound();}
            var products =_db.Products.Where(p=>p.CategoryId==id).ToList();

            if (products != null) {
                return Ok(products);
            
            }
            return NotFound();
        }


































    }

}
