using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_7.DTOs;
using Project_7.Models;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {  


        private readonly MyDbContext _db;
        public ReviewsController(MyDbContext db)
        {
            _db =db;
        }


        [HttpGet("/Api/Reviews/GetAllReviews")]
        public IActionResult Get()
        {
            var reviews= _db.Reviews.ToList();
            if (reviews != null)
            {

               
                return Ok(reviews);

            }

            return NotFound();

        }

        [HttpDelete("/Api/Reviews/DeleteReviews/{id}")]
         public IActionResult DeleteReview(int id  )
        {
            if (id <= 0)
            {
                return BadRequest();
            }

            var reviews = _db.Reviews.FirstOrDefault(p => p.ReviewId == id);

            if (reviews != null) { 
            
            _db.Reviews.Remove(reviews);
                _db.SaveChanges();
                return NoContent();
            
            }

            return NotFound();  
        }


        [HttpPost("/Api/Reviews/AddReview")]
        public IActionResult AddReview( [FromBody]ReviewRequestDTO request) {

            var review = new Review
            {
                ProductId = request.ProductId,
                Rating = request.Rating,
                Comment = request.Comment,
               
            };

             _db.Reviews.Add(review);
            _db.SaveChanges();
            return Ok (review);

        }
        [HttpPut("/Api/Reviews/EditReviews/{id}")]
        public IActionResult Update([FromBody]ReviewRequestDTO response,int id) {

            var reviews = _db.Reviews.FirstOrDefault(p => p.ReviewId == id);
        
            reviews.Rating = response.Rating;
            reviews.Comment = response.Comment;
            _db.Reviews.Update(reviews);
            _db.SaveChanges();
            return Ok(reviews);


        
        }


    }
}
