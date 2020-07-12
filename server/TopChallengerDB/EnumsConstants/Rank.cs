using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TopChallengerDB
{
    public class Rank
    {
        public int CurrentRank;
        public int CurrentRp;
        public int RpToNext;

        public int[] Rp =
        {
        0,
        30,
        60,
        90,
        120,
        150,
        180,
        210,
        240,
        270,
        300,
        360,
        420,
        480,
        540,
        600,
        660,
        720,
        780,
        840,
        900
        // max. rank 20. add more rp elements to increase
        };

        public Rank(int totalRp)
        {
            for (int rank = 0; rank < Rp.Length; rank++)
            {
                if(totalRp >= Rp[rank])
                {
                    CurrentRank = rank + 1; // rank up the user
                    RpToNext = Rp[rank + 1] - totalRp;
                    CurrentRp = totalRp - Rp[rank];
                }
            }
        }
    }
}
