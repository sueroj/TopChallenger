using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using TopChallengerDB.Models;
using MongoDB.Driver;
using MongoDB.Bson;

namespace TopChallengerDB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TopChallengerController : ControllerBase
    {
        public IMongoCollection<Profile> db; //test

        private readonly ILogger<TopChallengerController> _logger;

        public TopChallengerController(ILogger<TopChallengerController> logger)
        {
            _logger = logger;
        }

        [HttpPost("athleteId")]
        public async Task<IActionResult> Login(int athleteId)
        {
            var result = "";
            try
            {
                var document = new BsonDocument
                {
                    { "athleteId", athleteId }
                };
                result = await  _logger.LogInformation(db.InsertOne(document)); //Stopped here, needs database configed
            }
            catch (Exception e)
            {
                Console.Write(e);
            }

            return Ok(result);
        }
    }
}
