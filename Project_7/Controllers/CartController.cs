using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_7.DTOs.CartDtos;
using Project_7.Models;
using Project_7.Services;
using Project_7.TokenReaderNS;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController(MyDbContext db, IConfiguration config, PayPalPaymentService payPalService) : ControllerBase
    {
        private readonly string? _redirectUrl = config["PayPal:RedirectUrl"];
        [Authorize]
        [HttpGet("getCartItems")]
        public IActionResult GetCartItems()
        {
            var user = GetUser();
            if (user == null) return BadRequest("There were a problem while trying to get the user info");
            var (cartItems, _) = GetAllCartItems(user);
            var cartItemsD = cartItems.Select(cartItem => DisplayCartItemDto.createFromCartItem(cartItem)).ToList();
            return Ok(cartItemsD);
        }

        private (List<CartItem>, Cart) GetAllCartItems(User user)
        {
            var cart = db.Carts.FirstOrDefault(c => c.UserId == user.UserId);
            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = user.UserId,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                };
                db.Carts.Add(cart);
                db.SaveChanges();
            }
            return (db.CartItems.Where(cItem => cItem.CartId == cart.CartId).ToList(), cart);
        }
        [Authorize]
        [HttpPost("addToCart")]
        public IActionResult AddToCart(CartItemDto cartItem)
        {
            var user = GetUser();
            if (user == null) return BadRequest("There were a problem while trying to get the user info");

            var cart = db.Carts.FirstOrDefault(c => c.UserId == user.UserId);
            if (cart == null)
            {
                cart = new Cart
                {
                    UserId = user.UserId,
                    CreatedAt = DateTime.Now,
                    UpdatedAt = DateTime.Now,
                };
                db.Carts.Add(cart);
                db.SaveChanges();
            }

            var updatedCartItem = cartItem.CreateCartItem(db, cart);
            return Ok(DisplayCartItemDto.createFromCartItem(updatedCartItem));
        }

        [Authorize]
        [HttpDelete("deleteFromCart/{id:int}")]
        public IActionResult DeleteCartItem(int id)
        {

            var user = GetUser();
            var cartItem = db.CartItems.Find(id);
            if (cartItem == null)
                return NotFound();
            db.CartItems.Remove(cartItem);
            db.SaveChanges();
            return NoContent();
        }
        [Authorize]
        [HttpPut("updateCartItem/{id:int}")]
        public IActionResult UpdateCartItem(int id, UpdateCartItemDto update)
        {

            var user = GetUser();
            var cartItem = db.CartItems.Find(id);
            if (cartItem == null)
                return NotFound();
            cartItem.Quantity = update.Quantity;
            db.CartItems.Update(cartItem);
            db.SaveChanges();
            return Ok(DisplayCartItemDto.createFromCartItem(cartItem));
        }

        [Authorize]
        [HttpPost("checkout")]
        public IActionResult CreatePayment()
        {
            if (string.IsNullOrEmpty(_redirectUrl))
                throw new Exception("The redirect link for the paypal should be set correctly on the sitting app.");

            var user = GetUser();
            var (cartItems, cart) = GetAllCartItems(user);
            var totalPrice = cartItems.Sum(c => c.Price);
            var payment = payPalService.CreatePayment(_redirectUrl ?? " ", totalPrice, null, user.UserId);
            var approvalUrl = payment.links.FirstOrDefault(l => l.rel.Equals("approval_url", StringComparison.OrdinalIgnoreCase))?.href;

            return Ok(new { approvalUrl });
        }

        [HttpGet("success")]
        public IActionResult ExecutePayment(string paymentId, string PayerID, string token, int userId)
        {
            var user = db.Users.Find(userId);
            var (cartItems, cart) = GetAllCartItems(user);
            var totalAmount = cartItems.Sum(c => c.Price);

            // Create new order
            var order = new Order
            {
                UserId = user.UserId,
                Address = user.Address,
                OrderDate = DateTime.Now,
                ShippingStatus = "pending",
                CreatedAt = DateTime.Now,
                VoucherId = cart.VoucherId,
                TotalAmount = totalAmount
            };

            db.Orders.Add(order);

            // Add the cart Items to the order
            foreach (var cartItem in cartItems)
            {
                var orderItem = new OrderItem
                {
                    OrderId = order.OrderId,
                    Quantity = cartItem.Quantity,
                    TotalPrice = cartItem.Price
                };
                db.OrderItems.Add(orderItem);
                db.CartItems.Remove(cartItem);
            }
            db.Carts.Remove(cart);
            db.SaveChanges();

            var executedPayment = payPalService.ExecutePayment(paymentId, PayerID);
            var payment = new Payment
            {
                Status = executedPayment.state,
                OrderId = order.OrderId,
                Amount = order.TotalAmount,
                PaymentMethod = "Paypal",
                PaymentDate = DateTime.Now,
                TransactionId = executedPayment.id
            };

            return Ok(executedPayment);
        }

        [HttpGet("cancel")]
        public IActionResult CancelPayment()
        {
            return BadRequest("Payment canceled.");
        }

        private User? GetUser()
        {
            var tokenReader = new TokenReader(config);
            var token = Request.Headers["Authorization"].ToString().Split(' ')[1];
            var principal = tokenReader.ValidateToken(token);
            return db.Users.FirstOrDefault(u => u.UserName == principal.Identity.Name);

        }
    }
}
