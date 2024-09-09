using Project_7.Models;

namespace Project_7.DTOs.ReviewDtos
{
    public class ProductReviewDto
    {
        public int ReviewsCount { get; set; }
        public double OneStarReviewsPercentage { get; set; }
        public double TwoStarReviewsPercentage { get; set; }
        public double ThreeStarReviewsPercentage { get; set; }
        public double FourStarReviewsPercentage { get; set; }
        public double FiveStarReviewsPercentage { get; set; }
        public double OverAllRating { get; set; }
        public List<ReviewDto> Reviews { get; set; }
    }

    public class ReviewDto
    {
        public int ReviewId { get; set; }

        public string? UserName { get; set; }

        public string UserImage { get; set; }

        public int? Rating { get; set; }

        public string? Comment { get; set; }

        public DateTime? CreatedAt { get; set; }

    }
}
