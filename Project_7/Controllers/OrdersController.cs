using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_7.Models;
using Project_7.TokenReaderNS;
using static Org.BouncyCastle.Math.EC.ECCurve;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrdersController(MyDbContext db, IConfiguration config) : ControllerBase
    {
        [HttpGet("orders")]
        public IActionResult GetOrders()
        {
            var user = GetUser();
            var orders = db.Orders.Include(o => o.OrderItems).
                Include(o => o.Payments).
                Where(o => o.UserId == user.UserId).
                ToList();
            return Ok(orders);
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
