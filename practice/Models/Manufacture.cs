using System;
using System.Collections.Generic;
using NpgsqlTypes;

#nullable disable

namespace practice.Models
{
    public partial class Manufacture
    {
        public Manufacture()
        {
            Buildings = new HashSet<Building>();
            TechObjects = new HashSet<TechObject>();
        }

        public int Id { get; set; }
        public string ManufactureName { get; set; }
        public NpgsqlPoint? Coordinates { get; set; }
        public int? IdBoss { get; set; }
        public int? IdEnterprise { get; set; }
        public int? IdManufactureForm { get; set; }
        public int? IdContact { get; set; }

        public virtual Staff IdBossNavigation { get; set; }
        public virtual Contact IdContactNavigation { get; set; }
        public virtual Enterprise IdEnterpriseNavigation { get; set; }
        public virtual ManufactureForm IdManufactureFormNavigation { get; set; }
        public virtual ICollection<Building> Buildings { get; set; }
        public virtual ICollection<TechObject> TechObjects { get; set; }
    }
}
