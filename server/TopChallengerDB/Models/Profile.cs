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
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [JsonProperty("AthleteId")]
        public int AthleteId { get; set; }
        [JsonProperty("Rank")]
        public int Rank { get; set; }
        [JsonProperty("TotalExp")]
        public int TotalExp { get; set; }
        [JsonProperty("TotalComplete")]
        public int TotalComplete { get; set; }
        [JsonProperty("BadgeString")]
        public string BadgeString { get; set; }
        [JsonProperty("Monitor")]
        public int[] Monitor { get; set; }
        [JsonProperty("Background")]
        public string Background { get; set; }
        [JsonProperty("Title")]

        public string Title { get; set; }
        public DateTime DateFirstCreated { get; set; }

        public DateTime DateLastLogin { get; set; }

        //Initial values for new profiles
        public Profile(int athleteId)
        {
            AthleteId = athleteId;
            Rank = 1;
            TotalExp = 0;
            TotalComplete = 0;
            BadgeString = "none";
            Monitor = new int[5]; //dev only test
            Background = null; //dev only test
            Title = Reward.Title[0];
            DateFirstCreated = DateTime.Now;
            DateLastLogin = DateTime.Now;
        }

        //Constructor 2
        //public Profile(int athleteId, int rank, int totalExp, int totalComplete, string badgeString, int[] monitor, string background, string title)
        //{
        //    AthleteId = athleteId;
        //    Rank = rank;
        //    TotalExp = totalExp;
        //    TotalComplete = totalComplete;
        //    BadgeString = badgeString;
        //    Monitor = monitor;
        //    Background = background;
        //    Title = title;
        //    DateFirstCreated = DateTime.Now;
        //    DateLastLogin = DateTime.Now;

        //    if (Monitor == null)
        //    {
        //        int[] m = { 0, 0, 0, 0, 0 };
        //        Monitor = m;
        //    }       
        //}

        public void SetLastLogin(DateTime dateTime)
        {
            DateLastLogin = dateTime;
        }

        //public void SetMonitor(int[] monitor)
        //{
        //    for (int x = 0; x < monitor.Length; x++)
        //    {
        //        Monitor[x] = monitor[x];
        //    }
        //    //for (int x=0;x<monitor.Length;x++)
        //    //{
        //    //    if (Monitor[x] == 0)
        //    //    {
        //    //        Monitor[x] = 
        //    //    }
        //    //}
        //}

    }
}