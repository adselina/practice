using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class Excavation
    {
        public int Id { get; set; }
        public string ExcavationName { get; set; }
        public decimal? ExcLength { get; set; }
        public decimal? ExcDiameter { get; set; }
        public short? Angle { get; set; }
        public bool? Iscircular { get; set; }
        public short? Roughness { get; set; }
        public int? IdExcavationType { get; set; }
        public int? IdExcavationForm { get; set; }
        public int? IdAirDirection { get; set; }
        public int? IdTechObj { get; set; }

        public virtual AirDirection IdAirDirectionNavigation { get; set; }
        public virtual ExcavationForm IdExcavationFormNavigation { get; set; }
        public virtual ExcavationType IdExcavationTypeNavigation { get; set; }
        public virtual TechObject IdTechObjNavigation { get; set; }
    }
}
