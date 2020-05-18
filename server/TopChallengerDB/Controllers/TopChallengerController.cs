using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Bson;
using TopChallengerDB.Models;
using TopChallengerDB.Services;

namespace TopChallengerDB.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TopChallengerController : ControllerBase
    {
        private readonly TopChallengerService _topChallengerService;
        //private readonly ILogger<TopChallengerController> logger;

        public TopChallengerController(TopChallengerService topChallengerService)
        {
            _topChallengerService = topChallengerService;
        }

        //public TopChallengerController(ILogger<TopChallengerController> logger)
        //{
        //    _logger = logger;
        //}

        //Login: Check database for athlete ID, if does not exist, create one.
        //       If it does exist, pull profile from db and send to client.

        [HttpPost("login/{athleteId}")]
        public ActionResult<Profile> Login(int athleteId)
        {

            var profile = _topChallengerService.CreateNew(athleteId);
            Console.WriteLine($"Login: {athleteId}");

            return Ok(profile);
        }

        [HttpPost("profile")]
        public ActionResult<Profile> Create(Profile profile)
        {
            _topChallengerService.Create(profile);

            return CreatedAtRoute("GetProfile", new { id = profile.Id.ToString() }, profile);
        }

        //[HttpPost("athleteId/{id}")]
        //public async Task<IActionResult> Login(int id)
        //{
        //    try
        //    {
        //        var filter = Builders<BsonDocument>.Filter.Eq("athleteId", id);
        //        var result = collection.Find(filter).CountDocuments();

        //        if (result > 0)
        //        {
        //            _logger.LogInformation("Profile retrieved: " + result.ToString());
        //        }
        //        else
        //        {
        //            var document = new BsonDocument
        //        {
        //            { "athleteId", id }
        //        };
        //            await collection.InsertOneAsync(document);
        //            _logger.LogInformation("Profile created: " + id.ToString());
        //        }
        //    } catch (Exception e)
        //    {
        //        _logger.LogInformation("Failed to read from database: " + e.Message);
        //    }

        //    _logger.LogInformation(id.ToString());

        //    return Ok();
        //}
    }
}
