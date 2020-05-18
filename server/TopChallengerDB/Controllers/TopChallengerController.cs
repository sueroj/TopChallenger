using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
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

        //[HttpPut("new-challenge")]
        //public async Task<ActionResult<Challenge>> CreateChallenge(Challenge challenge)
        //{
        //    await _topChallengerService.CreateChallenge(challenge);
        //    Console.WriteLine($"New Challenge: {challenge}");

        //    return CreatedAtRoute("GetProfile", new { id = challenge.ChallengeId.ToString() }, challenge);
        //}

        [HttpPost("new-challenge/{challenge}")]
        public async Task<ActionResult<Challenge>> CreateChallenge(Challenge challenge)
        {
            await _topChallengerService.CreateChallenge(challenge);
            Console.WriteLine($"New Challenge: {challenge}");

            return Created("new-challenge", challenge);
        }

    }
}
