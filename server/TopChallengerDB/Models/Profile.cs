using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace TopChallengerDB.Models
{
    public class Profile
    {
        // Note: JSON Property is the name used for outgoing JSON tags.
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public int AthleteId { get; set; }
        public int Rank { get; set; }
        public int TotalExp { get; set; }
        public string BadgeString { get; set; }
        public Challenge[] Tracked { get; set; }
        public List<Challenge[]> Completed { get; set; }
        public Challenge[] Award { get; set; }
        public int TotalCompleted { get; set; }
        public string Background { get; set; }
        public string Title { get; set; }
        public DateTime DateFirstCreated { get; set; }
        public DateTime DateLastLogin { get; set; }

        //Initial values for new profiles
        public Profile(int athleteId)
        {
            AthleteId = athleteId;
            Rank = 1;
            TotalExp = 0;
            BadgeString = "none";
            Tracked = new Challenge[5];
            Completed = new List<Challenge[]>();
            Award = new Challenge[1];
            TotalCompleted = 0;
            Background = null; //dev only test
            Title = Reward.Title[0];
            DateFirstCreated = DateTime.Now;
            DateLastLogin = DateTime.Now;
        }

        public void SetLastLogin(DateTime dateTime)
        {
            DateLastLogin = dateTime;
        }

        public void AwardChallenge()
        {
            Completed.Add(Award);
        }
    }
}