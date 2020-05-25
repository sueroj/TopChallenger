using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace TopChallengerDB.Models
{
    public class Challenge //Consider using Abstract or Interface for the various categories, tiers, etc.
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [JsonProperty("ChallengeId")]
        public int ChallengeId { get; set;  }

        [JsonProperty("Name")]
        public string Name { get; set; }

        [JsonProperty("Type")]
        public Type Type { get; set; }

        [JsonProperty("Tier")]
        public Tier Tier { get; set; }

        [JsonProperty("BadgeId")]
        public int BadgeId { get; set; }

        [JsonProperty("Description")]
        public string Description { get; set; }

        [JsonProperty("Time")]
        public int Time { get; set; }

        [JsonProperty("Distance")]
        public int Distance { get; set; }
        [JsonProperty("MapId")]
        public string MapId { get; set; }
        [JsonProperty("Polyline")]
        public string Polyline { get; set; }


        //public Challenge(Challenge challenge)
        //{
        //    ChallengeId = challenge.ChallengeId;
        //    Name = challenge.Name;
        //    Type = challenge.Type;
        //    Tier = challenge.Tier;
        //    BadgeId = challenge.BadgeId;
        //    Description = challenge.Description;
        //    Time = challenge.Time;
        //    Distance = challenge.Distance;
        //}

        //public Challenge(int challengeId, string name, Type type, Tier tier, int badgeId, string description, int time, int distance)
        //{
        //    ChallengeId = challengeId;
        //    Name = name;
        //    Type = type;
        //    Tier = tier;
        //    BadgeId = badgeId;
        //    Description = description;
        //    Time = time;
        //    Distance = distance;
        //}
    }
}
