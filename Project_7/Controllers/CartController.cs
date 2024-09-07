using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_7.Models;

namespace Project_7.Controllers
{
    //[Authorize]  // This should be uncommented after conferencing the authentication 
    [Route("api/[controller]")]
    [ApiController]
    public class CartController(MyDbContext db) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetCartItems()
        {
            // This user should be taken from the Token.
            var user = db.Users.FirstOrDefault();
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
    }
}
