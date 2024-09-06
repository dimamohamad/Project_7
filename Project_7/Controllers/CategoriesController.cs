using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_7.Models;

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







    }
}
