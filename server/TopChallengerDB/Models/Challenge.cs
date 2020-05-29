using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;

namespace TopChallengerDB.Models
{
    public class Challenge
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public int ChallengeId { get; set;  }
        public string Name { get; set; }
        public Type Type { get; set; }
        public Tier Tier { get; set; }
        public int BadgeId { get; set; }
        public string Description { get; set; }
        public int MovingTime { get; set; } // in seconds
        public float AverageSpeed { get; set; } // in meters per second
        public float MaxSpeed { get; set; } // in meters per second
        public float Distance { get; set; } // in meters
        public float Elevation { get; set; } // (Total Elevation Gain) in meters
        public string MapId { get; set; }
        public int LocationCountry { get; set; }
        public string Polyline { get; set; }
    }
}
