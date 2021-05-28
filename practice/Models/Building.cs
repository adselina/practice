using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class Building
    {
        public int Id { get; set; }
        public string BuildingName { get; set; }
        public int? IdBuildingType { get; set; }
        public int? IdManufacture { get; set; }

        public virtual BuildingType IdBuildingTypeNavigation { get; set; }
        public virtual Manufacture IdManufactureNavigation { get; set; }
    }
}
