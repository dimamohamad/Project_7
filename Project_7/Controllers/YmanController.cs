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
        [HttpGet("test")]
        public IActionResult Get([FromForm] IFormFile image)
        {
            var imageName = SaveImage(image);
            return Ok(new { imageName });
        }



    }




}
