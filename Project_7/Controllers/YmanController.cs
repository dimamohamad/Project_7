﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static Project_7.Shared.ImageSaver;
using Project_7.TokenReaderNS;
using System.Net;
using System.Net.Mail;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YmanController(IConfiguration config) : ControllerBase
    {
        [HttpGet("SendEmail")]
        public IActionResult SendEmail()
        {
            try
            {
                // Set up the sender and receiver email addresses
                string fromAddress = "ymankh1997@gmail.com";
                string toAddress = "qqssww18@gmail.com"; // Replace with the recipient's email address

                // Set up the email subject and body
                string subject = "Test Email";
                string body = "This is a test email sent using C# and Gmail with an app password.";

                // Set up the Gmail SMTP client with the app password
                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587)
                {
                    Credentials = new NetworkCredential("ymankh1997@gmail.com", "xfru fxax xada hsws"), // Use your app password here
                    EnableSsl = true
                };

                // Create a MailMessage object
                MailMessage mailMessage = new MailMessage(fromAddress, toAddress, subject, body);

                // Send the email
                smtpClient.Send(mailMessage);
                Console.WriteLine("Email sent successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Failed to send email. Error: " + ex.Message);
            }

            return Ok();
        }

        //comment this is new controller 
        [HttpPost("test")]
        public IActionResult Get([FromForm] TestDto image)
        {
            var imageName = SaveImage(image.Image);
            return Ok(new { imageName });
        }

        [Authorize]
        [HttpGet("getDataFromUser")]
        public IActionResult GetDataFromToken()
        {
            var tokenReader = new TokenReader(config);
            var x = Request.Headers["Authorization"].ToString().Split(' ')[1];
            var principal = tokenReader.ValidateToken(x);
            return Ok(principal.Identity.Name);
        }
    }


    public class TestDto()
    {
        public IFormFile Image { get; set; }
    }




}
