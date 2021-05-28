using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class TechObject
    {
        public TechObject()
        {
            Excavations = new HashSet<Excavation>();
            TechSystems = new HashSet<TechSystem>();
        }

        public int Id { get; set; }
        public string TechObjectName { get; set; }
        public DateTime? OperationStartDate { get; set; }
        public DateTime? OperationEndDate { get; set; }
        public decimal? Square { get; set; }
        public int? IdManufacture { get; set; }

        public virtual Manufacture IdManufactureNavigation { get; set; }
        public virtual ICollection<Excavation> Excavations { get; set; }
        public virtual ICollection<TechSystem> TechSystems { get; set; }
        public virtual ICollection<Staff> staff { get; set; }
    }
}
