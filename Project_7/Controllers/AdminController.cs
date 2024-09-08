using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_7.DTOs;
using Project_7.Models;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly TokenGenerator _tokenGenerator;
        public AdminController(MyDbContext db, TokenGenerator tokenGenerator)
        {
            _db = db;
            _tokenGenerator = tokenGenerator;
        }
        [HttpGet("GetAllAdmins")]
        public IActionResult GetAllAdmins() 
        {
            var data = _db.Admins.ToList();
            return Ok(data);
        }

        [HttpPost("CreateAdmin")]
        public IActionResult CreateAdmin([FromForm] AdminDTO admin)
        {
            byte[] hash;
            byte[] salt;
            PasswordHash.Hasher(admin.Password, out hash, out salt);
            var data = new Admin
            {
                AdminName = admin.AdminName,
                Email = admin.Email,
                Password = admin.Password,
                PasswordHash = hash,
                PasswordSalt = salt,
            };
            _db.Admins.Add(data);
            _db.SaveChanges();
            return Ok(data);
        }


    }
}
