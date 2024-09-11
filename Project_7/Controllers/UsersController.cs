using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Project_7.DTOs;
using Project_7.DTOs.UserDtos;
using Project_7.Models;
using Project_7.TokenReaderNS;
using static Project_7.Shared.ImageSaver;
using static Org.BouncyCastle.Math.EC.ECCurve;
using static Project_7.Shared.EmailSender;


namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly MyDbContext _db;
        private readonly TokenGenerator _tokenGenerator;
        private readonly EmailService _emailService;
        private readonly IConfiguration _config;

        public UsersController(MyDbContext db, TokenGenerator tokenGenerator, EmailService emailService, IConfiguration config)
        {
            _db = db;
            _tokenGenerator = tokenGenerator;
            _emailService = emailService;
            _config = config;
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
        public IActionResult UpdateUser(int id, [FromForm] UpdateUserDTO user)
        {

            var data = _db.Users.Find(id);

            if (user.UserName != null)
                data.FirstName = user.FirstName;
            if (user.LastName != null)
                data.LastName = user.LastName;
            if (user.UserName != null)
                data.UserName = user.UserName;
            if (user.Email != null)
                data.Email = user.Email;
            if (user.PhoneNumber != null)
                data.PhoneNumber = user.PhoneNumber;
            if (user.UserImage != null)
                data.UserImage = SaveImage(user.UserImage);


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
        [HttpPut("ChangePassword/{id:int}")]
        public IActionResult ChangePassword(int id, [FromBody] ChangePasswordDTO user)
        {
            byte[] hash;
            byte[] salt;
            PasswordHash.Hasher(user.Passwword, out hash, out salt);
            var data = _db.Users.Find(id);
            data.Passwword = user.Passwword;
            data.PasswordHash = hash;
            data.PasswordSalt = salt;
            _db.Users.Update(data);
            _db.SaveChanges();
            return Ok(user);
        }
        [HttpGet("GetUserByEmail/{email}")]
        public IActionResult GetUserByEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email parameter is required.");
            }

            var user = _db.Users.FirstOrDefault(u => u.Email == email);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            return Ok(user);
        }
        [HttpPost("send")]
        public async Task<IActionResult> SendEmail([FromForm] EmailRequest request)
        {
            // Generate OTP
            var otp = OtpGenerator.GenerateOtp();
            var user = _db.Users.Where(x => x.Email == request.ToEmail).FirstOrDefault();
            user.Passwword = otp;
            _db.SaveChanges();

            // Create email body including the OTP
            var emailBody = $"Hello Dear, Your SmartTech OTP code for resetting your password is: {otp} Thank you.";
            var Subject = "send OTP";
            // Send email with OTP
            //await _emailService.SendEmailAsync(request.ToEmail, Subject, emailBody);
            Shared.EmailSender.SendEmail(request.ToEmail, Subject, emailBody);

            return Ok(new { message = "Email sent successfully.", otp, user.UserId }); // Optionally return the OTP for testing
        }
        [HttpPost("GetOTP/{id}")]
        public IActionResult GetOTP([FromForm] OTPDTO request, int id)
        {
            var user = _db.Users.Find(id);
            if (user.Passwword == request.OTP)
            {

                return Ok();

            }
            return BadRequest();
        }

        [Authorize]
        [HttpGet("getCurrentUserInfo")]
        public IActionResult GetCurrentUser()
        {
            return Ok(GetUser());
        }

        [Authorize]
        [HttpPost("EditAddress")]
        public IActionResult EditAddress([FromBody] EditAddressDto newAddress)
        {
            var user = GetUser();
            user.Address = newAddress.Address;
            _db.Users.Update(user);
            _db.SaveChanges();
            return Ok(newAddress);
        }

        private User? GetUser()
        {
            var tokenReader = new TokenReader(_config);
            var token = Request.Headers["Authorization"].ToString().Split(' ')[1];
            var principal = tokenReader.ValidateToken(token);
            return _db.Users.
                Include(u => u.Orders).
                ThenInclude(u => u.Payments).
                Include(u => u.Orders).
                ThenInclude(u => u.OrderItems).
                ThenInclude(u => u.Product).
                FirstOrDefault(u => u.UserName == principal.Identity.Name);

        }
    }
}
