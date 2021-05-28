using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class ExcavationPosition
    {
        public ExcavationPosition()
        {
            ExcavationTypes = new HashSet<ExcavationType>();
        }

        public int Id { get; set; }
        public string ExcPosition { get; set; }

        public virtual ICollection<ExcavationType> ExcavationTypes { get; set; }
    }
}
