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
        public Challenge[] TrackedChallenges { get; set; }
        public Challenge[] Completed { get; set; }
        public int TotalCompleted { get; set; }
        public long[] UploadedActivities { get; set; }
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
            TrackedChallenges = new Challenge[5];
            Completed = new Challenge[0];
            TotalCompleted = 0;
            UploadedActivities = new long[0];
            Background = null; //dev only test
            Title = Reward.Title[0];
            DateFirstCreated = DateTime.Now;
            DateLastLogin = DateTime.Now;
        }

        public void SetLastLogin(DateTime dateTime)
        {
            DateLastLogin = dateTime;
        }
    }
}