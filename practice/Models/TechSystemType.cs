using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class TechSystemType
    {
        public TechSystemType()
        {
            TechSystems = new HashSet<TechSystem>();
        }

        public int Id { get; set; }
        public string SystemTypeName { get; set; }

        public virtual ICollection<TechSystem> TechSystems { get; set; }
    }
}
