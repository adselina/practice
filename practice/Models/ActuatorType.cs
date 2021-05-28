using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class ActuatorType
    {
        public ActuatorType()
        {
            Actuators = new HashSet<Actuator>();
        }

        public int Id { get; set; }
        public string ActuatorTypeName { get; set; }
        public string MinValue { get; set; }
        public string MaxValue { get; set; }

        public virtual ICollection<Actuator> Actuators { get; set; }
    }
}
