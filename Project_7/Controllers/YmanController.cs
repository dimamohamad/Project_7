using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Project_7.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YmanController : ControllerBase
    {
        [HttpGet]
        public IActionResult Get() {

            return Ok();
        }




        //coment this is new controller 
    }



    
}
