using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class TechSystem
    {
        public TechSystem()
        {
            Units = new HashSet<Unit>();
        }

        public int Id { get; set; }
        public string TechSystemName { get; set; }
        public int? IdSystemType { get; set; }
        public int? IdTechObj { get; set; }

        public virtual TechSystemType IdSystemTypeNavigation { get; set; }
        public virtual TechObject IdTechObjNavigation { get; set; }
        public virtual ICollection<Unit> Units { get; set; }
    }
}
