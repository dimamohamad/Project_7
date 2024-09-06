namespace Project_7.DTOs
{
    public class ProductRequestDTO
    {
        public int? CategoryId { get; set; }

        public IFormFile? ProductImage1 { get; set; }

        public IFormFile? ProductImage2 { get; set; }

        public IFormFile? ProductImage3 { get; set; }

        public IFormFile? ProductImage4 { get; set; }

        public IFormFile? ProductImage5 { get; set; }

        public IFormFile? ProductImage6 { get; set; }

        public bool? Visiblity { get; set; }

        public string? ProductName { get; set; }

        public string? Description { get; set; }

        public decimal? Price { get; set; }

        public int? StockQuantity { get; set; }

        public decimal? DiscountPercentage { get; set; }
    }
}
