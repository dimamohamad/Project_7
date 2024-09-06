using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_7.DTOs;
using Project_7.Models;
using static Project_7.Shared.ImageSaver;
using static System.Net.Mime.MediaTypeNames;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {

        private readonly MyDbContext _db;
        public CategoriesController(MyDbContext db)
        {
            _db = db;
        }



        [HttpGet("/API/Categories/GetAllCategories")]
        public IActionResult GetAll()
        {

            var categories = _db.Categories.ToList();
            if (categories != null)
            {
                return Ok(categories);
            }
            return NoContent();
        }

        [HttpGet("/Api/Categories/GetCategorysbyId/{id}")]
        public IActionResult Get(int id)
        {

            if (id <= 0)
            {
                return BadRequest();

            }

            var categories = _db.Categories.Where(p => p.CategoryId == id).FirstOrDefault();

            if (categories != null)
            {
                return Ok(categories);

            }
            return NotFound();
        }


        [HttpDelete("/Api/Categories/DeleteCategory/{id}")]
        public IActionResult Delete(int id)
        {

            if (id <= 0)
            {
                return BadRequest();
            }
            var categories = _db.Categories.FirstOrDefault(p => p.CategoryId == id);
            if (categories != null)
            {

                _db.Categories.Remove(categories);
                _db.SaveChanges();
                return NoContent();

            }
            return NotFound();

        }

        [HttpPost]

        public IActionResult CreateCategory([FromForm] CategoryRequestDTO request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();

            }
            var category = new Category
            {


                CategoryImage = SaveImage(request.CategoryImage),
                CategoryName = request.CategoryName,
                Description = request.Description
            };

          _db.Categories.Add(category);
            _db.SaveChanges();
            return Ok(category);

        }


        [HttpPut("/Api/Categories/UpdateCategory/{id}")]
        public IActionResult UpdateCategory([FromForm] CategoryRequestDTO response ,int id) { 
        
           var category = _db.Categories.FirstOrDefault(c => c.CategoryId == id);
            if (category != null) {


                category.CategoryImage = SaveImage(response.CategoryImage);
                category.CategoryName = response.CategoryName;
                category.Description = response.Description;

                _db.Categories.Update(category);
                _db.SaveChanges();
                return Ok(category);
            }
            return NotFound();
        }


    }
}
