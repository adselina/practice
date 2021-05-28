using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class Actuator
    {
        public Actuator()
        {
            Commands = new HashSet<Command>();
        }

        public int Id { get; set; }
        public string ActuatorName { get; set; }
        public string ActuatorState { get; set; }
        public int? IdActuatorType { get; set; }
        public int? IdOutVariable { get; set; }

        public virtual ActuatorType IdActuatorTypeNavigation { get; set; }
        public virtual OutVariable IdOutVariableNavigation { get; set; }
        public virtual ICollection<Command> Commands { get; set; }
    }
}
