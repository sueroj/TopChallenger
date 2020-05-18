using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TopChallengerDB.Models
{
    public class Profile
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public int AthleteId { get; set; }
        public int Rank { get; set; }
        public int TotalExp { get; set; }
        public string BadgeString { get; set; }
        public int[] Monitor { get; set; }
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
            Monitor = new int[5]; //dev only test
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