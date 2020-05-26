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

        [JsonProperty("BadgeId")] // **** Flagged for removal. ****
        public int BadgeId { get; set; }

        [JsonProperty("Description")]
        public string Description { get; set; }

        [JsonProperty("MovingTime")] // in seconds
        public int MovingTime { get; set; }

        [JsonProperty("AverageSpeed")] // in meters per second
        public float AverageSpeed { get; set; }

        [JsonProperty("MaxSpeed")] // in meters per second
        public float MaxSpeed { get; set; }

        [JsonProperty("Distance")] // in meters
        public float Distance { get; set; }

        [JsonProperty("Elevation")] // (Total Elevation Gain) in meters
        public float Elevation { get; set; }

        [JsonProperty("MapId")]
        public string MapId { get; set; }

        [JsonProperty("LocationCountry")]
        public int LocationCountry { get; set; }

        [JsonProperty("Polyline")]
        public string Polyline { get; set; }
    }
}
