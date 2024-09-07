using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using static Project_7.Shared.ImageSaver;
using Project_7.TokenReaderNS;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YmanController(IConfiguration config) : ControllerBase
    {
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
            if (principal != null)
            {
                var username = principal.FindFirst(ClaimTypes.Name)?.Value; // Extract the username
                Console.WriteLine($"Username: {username}");
            }
            else
            {
                Console.WriteLine("Invalid token.");
            }
            return Ok();
        }
    }


    public class TestDto()
    {
        public IFormFile Image { get; set; }

    }



}
