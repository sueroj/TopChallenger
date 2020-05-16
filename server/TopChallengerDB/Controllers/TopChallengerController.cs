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
        private MongoClient client { get; set; }
        private IMongoDatabase database { get; set; }
        private IMongoCollection<BsonDocument> collection { get; set; }

        private readonly ILogger<TopChallengerController> _logger;

        public TopChallengerController(ILogger<TopChallengerController> logger)
        {
            _logger = logger;
            //client = new MongoClient("localhost");
            //database = client.GetDatabase("topchallengerdb");
            //collection = database.GetCollection<BsonDocument>("profiles");
        }

        [HttpPost("athleteId/{id}")]
        public async Task<IActionResult> Login(int id)
        {
            //var document = new BsonDocument
            //{
            //    { "athleteId", athleteId }
            //};
            //await collection.InsertOneAsync(document);

            _logger.LogInformation(id.ToString());

            return Ok();
        }

        //[HttpGet("athleteId/{id}")]
        //public async Task<IActionResult> Login(int id)
        //{
        //    //var document = new BsonDocument
        //    //{
        //    //    { "athleteId", athleteId }
        //    //};
        //    //await collection.InsertOneAsync(document);

        //    _logger.LogInformation(id.ToString());

        //    return Ok();
        //}
    }
}
