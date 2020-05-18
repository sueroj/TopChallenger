﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TopChallengerDB.Models
{
    public class Challenge //Consider using Abstract or Interface for the various categories, tiers, etc.
    {
        public int ChallengeId;
        public int BadgeId;
        public string BadgeFilePath;
        public string Name;
        public string Type;
    }
}