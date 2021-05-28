using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class OutVariable
    {
        public OutVariable()
        {
            Actuators = new HashSet<Actuator>();
        }

        public int Id { get; set; }
        public int? IdVariable { get; set; }
        public DateTime? OutVariableTimestamp { get; set; }
        public string OutVariableValue { get; set; }

        public virtual Variable IdVariableNavigation { get; set; }
        public virtual ICollection<Actuator> Actuators { get; set; }
    }
}
