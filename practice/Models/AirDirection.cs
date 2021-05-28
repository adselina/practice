using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class AirDirection
    {
        public AirDirection()
        {
            Excavations = new HashSet<Excavation>();
        }

        public int Id { get; set; }
        public bool? Direction { get; set; }

        public virtual ICollection<Excavation> Excavations { get; set; }
    }
}
