using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project_7.DTOs.CartDtos;
using Project_7.Models;
using Project_7.Services;
using Project_7.TokenReaderNS;

namespace Project_7.Controllers
{
    [Authorize]  // This should be uncommented after conferencing the authentication 
    [Route("api/[controller]")]
    [ApiController]
    public class CartController(MyDbContext db, IConfiguration config, PayPalPaymentService payPalService) : ControllerBase
    {
        private readonly string? _redirectUrl = config["PayPal:RedirectUrl"];

        [HttpGet("getCartItems")]
        public IActionResult GetCartItems()
        {
            var user = GetUser();
            if (user == null) return BadRequest("There were a problem while trying to get the user info");
            var cartItems = GetAllCartItems(user);
            return Ok(cartItems);
        }

        private List<CartItem> GetAllCartItems(User user)
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
            return db.CartItems.Where(cItem => cItem.CartId == cart.CartId).ToList();
        }

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
            return Ok(updatedCartItem);
        }


        [HttpDelete("addToCart/{id:int}")]
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
        [HttpPut("addToCart/{id:int}")]
        public IActionResult UpdateCartItem(int id, UpdateCartItemDto update)
        {

            var user = GetUser();
            var cartItem = db.CartItems.Find(id);
            if (cartItem == null)
                return NotFound();
            cartItem.Quantity = update.Quantity;
            db.SaveChanges();
            return NoContent();
        }


        [HttpPost("create")]
        public IActionResult CreatePayment()
        {
            if (string.IsNullOrEmpty(_redirectUrl))
                throw new Exception("The redirect link for the paypal should be set correctly on the sitting app.");

            var payment = payPalService.CreatePayment(_redirectUrl ?? " ", 20m, null);
            var approvalUrl = payment.links.FirstOrDefault(l => l.rel.Equals("approval_url", StringComparison.OrdinalIgnoreCase))?.href;

            return Ok(new { approvalUrl });
        }

        [HttpGet("success")]
        public IActionResult ExecutePayment(string paymentId, string PayerID)
        {
            var executedPayment = payPalService.ExecutePayment(paymentId, PayerID);
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
            var x = Request.Headers["Authorization"].ToString().Split(' ')[1];
            var principal = tokenReader.ValidateToken(x);
            return db.Users.FirstOrDefault(u => u.UserName == principal.Identity.Name);
        }
    }
}
