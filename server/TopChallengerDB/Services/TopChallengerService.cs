using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TopChallengerDB.Models;
using MongoDB.Driver;

namespace TopChallengerDB.Services
{
    public class TopChallengerService
    {
        private readonly IMongoCollection<Profile> _profiles;
        private readonly IMongoCollection<Challenge> _challenges;

        public TopChallengerService(ITopChallengerDbSettings settings)
        {
            var client = new MongoClient(settings.ConnectionString);
            var database = client.GetDatabase(settings.DatabaseName);

            _profiles = database.GetCollection<Profile>(settings.CollectionName);
            _challenges = database.GetCollection<Challenge>("challenges");
        }

        public List<Profile> Get() =>
            _profiles.Find(profile => true).ToList();

        public Profile Get(string id) =>
            _profiles.Find<Profile>(profile => profile.Id == id).FirstOrDefault();

        //Creates a new profile using with athleteID
        public Profile CreateNew(int athleteId)
        {
            Profile profile = _profiles.Find<Profile>(profile => profile.AthleteId == athleteId).FirstOrDefault();
            if (profile == null)
            {
                profile = new Profile(athleteId);
                Create(profile);
            }
            profile.SetLastLogin(DateTime.Now);
            Update(profile.Id, profile);
            return profile;
        }

        public Profile Create(Profile profile)
        {
            _profiles.InsertOne(profile);
            return profile;
        }

        public void Update(string id, Profile profileIn) =>
            _profiles.ReplaceOne(profile => profile.Id == id, profileIn);

        public void Remove(Profile bookIn) =>
            _profiles.DeleteOne(profile => profile.Id == bookIn.Id);

        public void Remove(string id) =>
            _profiles.DeleteOne(profile => profile.Id == id);

        //Challenges collection services below.
        public async Task<Challenge> CreateChallenge(Challenge challenge)
        {
            if (_challenges.Find<Challenge>(filter => filter.ChallengeId == challenge.ChallengeId).FirstOrDefault() == null)
            {
                await _challenges.InsertOneAsync(challenge);
            }
            else return null;  
            return challenge;
        }

        public List<Challenge> GetChallenges() =>
            _challenges.Find(challenge => true).ToList();




    }
}
