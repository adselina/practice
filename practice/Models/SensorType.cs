using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class SensorType
    {
        public SensorType()
        {
            Sensors = new HashSet<Sensor>();
        }

        public int Id { get; set; }
        public string SensorTypeName { get; set; }
        public string MinValue { get; set; }
        public string MaxValue { get; set; }

        public virtual ICollection<Sensor> Sensors { get; set; }
    }
}
