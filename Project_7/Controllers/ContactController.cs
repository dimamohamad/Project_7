﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_7.DTOs;
using Project_7.Models;
using static Project_7.Shared.EmailSender;

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
            SendEmail(ContactRequestDTO.Email, "Confirmation", "Thank you for contacting us. We will get back to you soon.");

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



        [HttpDelete("DeleteMessage/{id}")]
        public IActionResult DeleteMessage(int id)
        {
           
            var message = _db.ContactUs.FirstOrDefault(m => m.MessageId == id);

          
            if (message == null)
            {
                return NotFound();
            }

           
            _db.ContactUs.Remove(message);
            _db.SaveChanges();  

          
            return Ok(new { message = "Message deleted successfully." });
        }


    }
}
