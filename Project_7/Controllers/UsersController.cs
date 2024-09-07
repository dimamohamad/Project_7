using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Query.Internal;
using Project_7.DTOs;
using Project_7.Models;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly TokenGenerator _tokenGenerator;
        public UsersController(MyDbContext db, TokenGenerator tokenGenerator) 
        {
            _db = db;
            _tokenGenerator = tokenGenerator;
        }

        [HttpGet("ShowAllUsers")]
        public IActionResult GetAllUser() 
        {
            var users = _db.Users.ToList();
            return Ok(users);
        }
        [HttpGet("ShowUserByID")]
        public IActionResult GetUser(int id) 
        {
            var user = _db.Users.Find(id);
            return Ok(user);
        }

        [HttpPost("RegisterUsers")]
        public IActionResult Register([FromForm] UserRegisterDTO user)
        {
            byte[] hash;
            byte[] salt;
            PasswordHash.Hasher(user.Passwword, out hash, out salt);
            var data = new User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Email = user.Email,
                Passwword = user.Passwword,
                PasswordHash = hash,
                PasswordSalt = salt,
            };
            _db.Users.Add(data);
            _db.SaveChanges();
            return Ok(data);
        }
        [HttpPost("LoginUsers")]
        public IActionResult Login([FromForm] UserLoginDTO user) 
        {
            var data = _db.Users.FirstOrDefault(x => x.Email == user.Email);
            if (data == null || !PasswordHash.verifyPassword(user.Passwword, data.PasswordHash , data.PasswordSalt)) 
            {
                return Unauthorized();
            }
            var token = _tokenGenerator.GenerateToken(data.UserName);

            return Ok(new { Token = token });
        }
    }
}
