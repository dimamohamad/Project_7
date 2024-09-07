using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Project_7.DTOs.CartDtos;
using Project_7.Models;
using Project_7.TokenReaderNS;

namespace Project_7.Controllers
{
    [Authorize]  // This should be uncommented after conferencing the authentication 
    [Route("api/[controller]")]
    [ApiController]
    public class CartController(MyDbContext db, IConfiguration config) : ControllerBase
    {
        [HttpGet("getCartItems")]
        public IActionResult GetCartItems()
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
            var cartItems = db.CartItems.Where(cItem => cItem.CartId == cart.CartId);
            return Ok(cartItems);
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

        private User? GetUser()
        {
            var tokenReader = new TokenReader(config);
            var x = Request.Headers["Authorization"].ToString().Split(' ')[1];
            var principal = tokenReader.ValidateToken(x);
            return db.Users.FirstOrDefault(u => u.UserName == principal.Identity.Name);
        }
    }
}
