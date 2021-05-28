using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class ExcavationType
    {
        public ExcavationType()
        {
            Excavations = new HashSet<Excavation>();
        }

        public int Id { get; set; }
        public string ExcavationTypeName { get; set; }
        public int? LengthMin { get; set; }
        public int? LengthMax { get; set; }
        public int? IdPosition { get; set; }

        public virtual ExcavationPosition IdPositionNavigation { get; set; }
        public virtual ICollection<Excavation> Excavations { get; set; }
    }
}
