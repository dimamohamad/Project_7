using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_7.DTOs;
using Project_7.Models;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactController : ControllerBase
    {
        private readonly MyDbContext _db;
        public ContactController(MyDbContext db)
        {
            _db = db;
        }





        [HttpPost("AddMessage")]
        public IActionResult PostContactUs([FromForm] ContactRequest ContactRequestDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           
            var contactUs = new ContactU
            {
                Name = ContactRequestDTO.Name,
                Email = ContactRequestDTO.Email,
                Subject = ContactRequestDTO.Subject,
                Message = ContactRequestDTO.Message,
               
            };

            _db.ContactUs.Add(contactUs);
            _db.SaveChanges();

            return Ok(new { message = "Contact form submitted successfully" });
        }


        [HttpGet("GetMessages")]
        public IActionResult GetContactMessages()
        {
            var messages = _db.ContactUs
                              .OrderBy(m => m.SubmittedAt)  
                              .ToList();  

            return Ok(messages); 
        }



    }
}
