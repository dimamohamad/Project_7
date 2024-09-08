﻿using Microsoft.AspNetCore.Http;
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
        [HttpGet("ShowUserByID/{id:int}")]
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
            var token = _tokenGenerator.GenerateToken(data.UserName);
            var response = new
            {
                Token = token,
                User = data
            };
            _db.Users.Add(data);
            _db.SaveChanges();
            return Ok(response);
        }
        [HttpPost("LoginUsers")]
        public IActionResult Login([FromForm] UserLoginDTO user)
        {
            var data = _db.Users.FirstOrDefault(x => x.Email == user.Email);
            if (data == null || !PasswordHash.verifyPassword(user.Password, data.PasswordHash, data.PasswordSalt))
            {
                return Unauthorized();
            }

            var token = _tokenGenerator.GenerateToken(data.UserName);

            var response = new
            {
                Token = token,
                User = data
            };

            return Ok(response);
        }
        [HttpPut("UpdateUser/{id:int}")]
        public IActionResult UpdateUser(int id, [FromForm]UpdateUserDTO user)
        {
            var uploadedFolder = Path.Combine(Directory.GetCurrentDirectory(), "UsersImage");
            if (!Directory.Exists(uploadedFolder))
            {
                Directory.CreateDirectory(uploadedFolder);
            }
            var fileImage = Path.Combine(uploadedFolder, user.UserImage.FileName);
            using (var stream = new FileStream(fileImage, FileMode.Create))
            {
                user.UserImage.CopyToAsync(stream);
            }
            var data = _db.Users.Find(id);

            data.FirstName = user.FirstName;
            data.LastName = user.LastName;
            data.UserName = user.UserName;
            data.Email = user.Email;
            data.Passwword = user.Passwword;
            data.PhoneNumber = user.PhoneNumber;
            data.UserImage = user.UserImage.FileName;
          
            _db.Users.Update(data);
            _db.SaveChanges();  
            return Ok(user);
        }
        [HttpDelete("DeleteUser/{id:int}")]
        public IActionResult DeleteUser(int id) 
        {
            var user = _db.Users.Find(id);
            _db.Users.Remove(user);
            _db.SaveChanges();
            return Ok(user);
        }

    }
}
