using Project_7.DTOs.ProductDtos;
using Project_7.Models;

namespace Project_7.DTOs.CartDtos
{
    public class DisplayCartItemDto
    {
        public int CartItemId { get; set; }

        public int? CartId { get; set; }

        public int Quantity { get; set; }

        public decimal Price { get; set; }

        public int? ProductId { get; set; }

        public ProductDtos.ProductDisplayDto Product { get; set; }

        public static DisplayCartItemDto createFromCartItem(CartItem cartItem)
        {
            return new DisplayCartItemDto
            {
                ProductId = cartItem.ProductId,
                Quantity = cartItem.Quantity,
                Price = cartItem.Price,
                CartId = cartItem.CartId,
                CartItemId = cartItem.CartItemId,
                Product = ProductDisplayDto.CreateDtoFromProduct(cartItem.Product)
            };
        }
    }


}
