using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using static Project_7.Shared.ImageSaver;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YmanController : ControllerBase
    {
        //comment this is new controller 
        [HttpPost("test")]
        public IActionResult Get([FromForm] TestDto image)
        {
            var imageName = SaveImage(image.Image);
            return Ok(new { imageName });
        }
    }


    public class TestDto()
    {
        public IFormFile Image { get; set; }
    }



}
