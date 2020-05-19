using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TopChallengerDB.Models
{
    public class TopChallengerDbSettings : ITopChallengerDbSettings
    {
        public string CollectionName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public interface ITopChallengerDbSettings
    {
        string CollectionName { get; set; }
        string ConnectionString { get; set; }
        string DatabaseName { get; set; }
    }
}
