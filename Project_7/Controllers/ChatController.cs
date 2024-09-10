
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.DotNet.Scaffolding.Shared.Messaging;
//using System;
//namespace Project_7.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ChatController : ControllerBase
//    {



//        private static List<Project_7.Models.Message> Messages = new List<Project_7.Models.Message>();

//        // Get all messages
//        [HttpGet]
//        public IActionResult GetMessages()
//        {
//            return Ok(Messages.OrderBy(m => m.Timestamp));
//        }

//        // Post a new message
//        [HttpPost]
//        public IActionResult PostMessage([FromBody] Project_7.Models.Message message)
//        {
//            message.Id = Messages.Count + 1;
//            message.Timestamp = DateTime.UtcNow;
//            Messages.Add(message);
//            return Ok(message);
//        }
//    }
//}
