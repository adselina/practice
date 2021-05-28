using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class UnitType
    {
        public UnitType()
        {
            Units = new HashSet<Unit>();
        }

        public int Id { get; set; }
        public string UnitTypeName { get; set; }
        public int? MinValue { get; set; }
        public int? MaxValue { get; set; }

        public virtual ICollection<Unit> Units { get; set; }
    }
}
