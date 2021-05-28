using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class BuildingType
    {
        public BuildingType()
        {
            Buildings = new HashSet<Building>();
        }

        public int Id { get; set; }
        public string BuildingTypeName { get; set; }

        public virtual ICollection<Building> Buildings { get; set; }
    }
}
