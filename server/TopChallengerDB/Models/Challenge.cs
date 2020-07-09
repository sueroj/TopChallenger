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
        public int ChallengeId { get; set; }
        public string Name { get; set; }
        public Type Type { get; set; }
        public Tier Tier { get; set; }
        public int Difficulty { get; set; }
        private int _rp; 
        public int Rp { 
            get => _rp; 
            set { _rp = Difficulty * 10; } }
        public string Description { get; set; }
        public int SegmentId { get; set; }
        public int MovingTime { get; set; } // in seconds
        public TargetTime TargetTime { get; set; } //int seconds [Gold, Silver, Bronze]
        public float AverageSpeed { get; set; } // in meters per second
        public float MaxSpeed { get; set; } // in meters per second
        public float Distance { get; set; } // in meters
        public float Elevation { get; set; } // (Total Elevation Gain) in meters
        public string Polyline { get; set; }

        public double StartLng { get; set; }
        public double StartLat { get; set; }
        public double EndLng { get; set; }
        public double EndLat { get; set; }

        public void PrepareNewChallenge(Challenge challenge)
        {
            Rp = challenge.Difficulty * 10;
        }
    }
}
