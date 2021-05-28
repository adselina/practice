using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class Unit
    {
        public int Id { get; set; }
        public string UnitName { get; set; }
        public DateTime? OperationStartDate { get; set; }
        public DateTime? OperationEndDate { get; set; }
        public int? IdUnitType { get; set; }
        public int? IdSystem { get; set; }

        public virtual TechSystem IdSystemNavigation { get; set; }
        public virtual UnitType IdUnitTypeNavigation { get; set; }
    }
}
