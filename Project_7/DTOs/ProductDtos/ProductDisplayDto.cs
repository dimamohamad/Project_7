using Project_7.Models;

namespace Project_7.DTOs.ProductDtos
{
    public class ProductDisplayDto
    {
        public int ProductId { get; set; }

        public int? CategoryId { get; set; }

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

        public DateTime? CreatedAt { get; set; }

        public static ProductDisplayDto CreateDtoFromProduct(Product product)
        {
            return new ProductDisplayDto
            {
                Price = product.Price,
                StockQuantity = product.StockQuantity,
                DiscountPercentage = product.DiscountPercentage,
                CreatedAt = product.CreatedAt,
                CategoryId = product.CategoryId,
                ProductImage1 = product.ProductImage1,
                ProductImage2 = product.ProductImage2,
                ProductImage3 = product.ProductImage3,
                ProductImage4 = product.ProductImage4,
                ProductImage5 = product.ProductImage5,
                ProductImage6 = product.ProductImage6,
                Description = product.Description,
                ProductId = product.ProductId,
                ProductName = product.ProductName,
                Visiblity = product.Visiblity
            };
        }
    }

}
