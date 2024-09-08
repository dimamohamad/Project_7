using Project_7.Models;

namespace Project_7.DTOs.ProductDtos
{
    public class ProductWithRatingDto
    {

        public int ProductId { get; set; }

        public int? CategoryId { get; set; }

        public double Rating { get; set; }

        public string? ProductImage1 { get; set; }

        public string? ProductImage2 { get; set; }

        public string? ProductImage3 { get; set; }

        public string? ProductImage4 { get; set; }

        public string? ProductImage5 { get; set; }

        public string? ProductImage6 { get; set; }

        public bool? Visiblity { get; set; }

        public string? ProductName { get; set; }

        public string? Description { get; set; }

        public decimal? Price { get; set; }

        public int? StockQuantity { get; set; }

        public decimal? DiscountPercentage { get; set; }




    }
}
