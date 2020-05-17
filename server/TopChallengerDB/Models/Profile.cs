using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TopChallengerDB.Models
{
    public class Profile
    {
        private readonly int UniqueId;
        public int AthleteId { get; set; }
        public int Rank { get; set; }
        public int TotalExp { get; set; }
        public string BadgeString { get; set; }
        public string Background { get; set; }

        public string Title { get; set; }

        public DateTime DateFirstCreated
        {
            get => dateFirstCreated;
            set { dateFirstCreated = DateTime.Now; }
        }

        private DateTime dateFirstCreated;

    }
}