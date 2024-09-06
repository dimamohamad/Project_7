using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YmanController : ControllerBase
    {
        //comment this is new controller 
        [HttpGet("test")]
        public IActionResult Get()
        {
            return Ok(new { messAGE = "This is the message" });
        }


    }
}
