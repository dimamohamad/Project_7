using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Project_7.DTOs;
using Project_7.Models;
using static Project_7.Shared.ImageSaver;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AddUserController : ControllerBase
    {
        private readonly MyDbContext _db;

        public AddUserController (MyDbContext db)
        {
            _db = db;
        }

        [HttpGet("GetAllUsers")]

        public IActionResult GetAllUsers() {
            var users = _db.Users.ToList();

            if (users != null)
            { 
            return Ok((users));
            }
            return NotFound();
        
        }

        [HttpGet("GetUserByID{id}")]
        public IActionResult GetUserByID(int id) { 
        
            var user =_db.Users.FirstOrDefault(s=>s.UserId== id);

            if (user != null) { 
            return Ok((user));
            }
            return NotFound();
        }

        [HttpGet("GetUserByName{name}")]
        public IActionResult GetUserByName(string name) {

            var user = _db.Users.Where(x => x.UserName == name).ToList();
            if (user != null) {
            return Ok(user); 
                
            }
            return NotFound();
        }

        [HttpDelete("DeleteUser{id}")]
        public IActionResult DeleteUser(int id) {
            
            var user = _db.Users.FirstOrDefault(x => x.UserId == id);

            if (user != null) { 
                _db.Users.Remove(user);
                _db.SaveChanges();  
                return Ok();
            }
            return NotFound();
        
        }

        [HttpPost("AddNewUser")]
        public IActionResult AddNewUser([FromForm] AddUserDTO user) {


            if (!ModelState.IsValid)
            {

            return BadRequest(ModelState); 
            
            }

            var NewUser = new User
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                UserName = user.UserName,
                Email = user.Email,
                Passwword = user.Passwword,
                UserImage = SaveImage(user.UserImage),
                PhoneNumber = user.PhoneNumber,
                Address = user.Address



            };
            _db.Users.Add(NewUser);
            _db.SaveChanges();
            return Ok(NewUser);
        
        }

        [HttpPut("UpdateUser{id}")]

        public IActionResult UpdateUser([FromForm] AddUserDTO user, int id) {
          
            if (id <= 0)
            {
                return BadRequest();
            }

            var UserID= _db.Users.FirstOrDefault(x=>x.UserId == id);

            if (UserID != null) { 
            
            
                UserID.FirstName = user.FirstName;
                UserID.LastName = user.LastName;
                UserID.UserName = user.UserName;
                UserID.Email = user.Email;
                UserID.Passwword = user.Passwword;
                UserID.UserImage = SaveImage(user.UserImage);
                UserID.PhoneNumber = user.PhoneNumber;
                UserID.Address = user.Address;

                _db.Users.Update(UserID);
                _db.SaveChanges();
                return Ok(user);
                    }

            return NotFound();

        }


        


        }
    }

