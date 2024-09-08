using Azure.Core;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_7.DTOs;
using Project_7.DTOs.ProductDtos;
using Project_7.DTOs.ReviewDtos;
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
            _db = db;
        }


        [HttpGet("/Api/Reviews/GetAllReviews")]
        public IActionResult Get()
        {
            var reviews = _db.Reviews.ToList();
            if (reviews != null)
            {


                return Ok(reviews);

            }

            return NotFound();

        }

        [HttpDelete("/Api/Reviews/DeleteReviews/{id}")]
        public IActionResult DeleteReview(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }

            var reviews = _db.Reviews.FirstOrDefault(p => p.ReviewId == id);

            if (reviews != null)
            {

                _db.Reviews.Remove(reviews);
                _db.SaveChanges();
                return NoContent();

            }

            return NotFound();
        }


        [HttpPost("/Api/Reviews/AddReview")]
        public IActionResult AddReview([FromBody] ReviewRequestDTO request)
        {

            var review = new Review
            {
                ProductId = request.ProductId,
                Rating = request.Rating,
                Comment = request.Comment,

            };

            _db.Reviews.Add(review);
            _db.SaveChanges();
            return Ok(review);

        }
        [HttpPut("/Api/Reviews/EditReviews/{id}")]
        public IActionResult Update([FromBody] ReviewRequestDTO response, int id)
        {

            var reviews = _db.Reviews.FirstOrDefault(p => p.ReviewId == id);

            reviews.Rating = response.Rating;
            reviews.Comment = response.Comment;
            _db.Reviews.Update(reviews);
            _db.SaveChanges();
            return Ok(reviews);

        }
        [HttpGet("SingleProductReviews/{id:int}")]
        public IActionResult GetProductReviews(int id)
        {
            var product = _db.Products.Find(id);

            if (product == null)
                return NotFound();

            var productReviews = _db.Reviews.Include(r => r.User).Where(r => r.ProductId == id).ToList();
            var reviewsComments = new List<ReviewDto>();
            foreach (var review in productReviews)
            {
                reviewsComments.Add(new ReviewDto
                {
                    Rating = review.Rating,
                    Comment = review.Comment,
                    CreatedAt = review.CreatedAt,
                    UserName = review.User.UserName,
                    UserImage = review.User.UserImage,
                    ReviewId = review.ReviewId
                });
            }
            var reviewCount = productReviews.Count();
            var ratingSum = productReviews.Sum(r => r.Rating);
            var reviews = new ProductReviewDto
            {
                ReviewsCount = reviewCount,
                OverAllRating = reviewCount == 0 ? 0 : (double)ratingSum! / (double)reviewCount,
                FiveStarReviewsPercentage = productReviews.Any(r => r.Rating == 5) ? productReviews.Count(r => r.Rating == 5) / (double)reviewCount : 0,
                FourStarReviewsPercentage = productReviews.Any(r => r.Rating == 4) ? productReviews.Count(r => r.Rating == 4) / (double)reviewCount : 0,
                ThreeStarReviewsPercentage = productReviews.Any(r => r.Rating == 3) ? productReviews.Count(r => r.Rating == 3) / (double)reviewCount : 0,
                TwoStarReviewsPercentage = productReviews.Any(r => r.Rating == 2) ? productReviews.Count(r => r.Rating == 2) / (double)reviewCount : 0,
                OneStarReviewsPercentage = productReviews.Any(r => r.Rating == 1) ? productReviews.Count(r => r.Rating == 1) / (double)reviewCount : 0,
                Reviews = reviewsComments
            };

            return Ok(reviews);
        }


    }
}
