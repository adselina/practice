using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class Command
    {
        public int Id { get; set; }
        public short Order { get; set; }
        public string CommandValue { get; set; }
        public DateTime? CommandTimestamp { get; set; }
        public int? IdActuator { get; set; }
        public int? IdController { get; set; }

        public virtual Actuator IdActuatorNavigation { get; set; }
        public virtual _Controller IdControllerNavigation { get; set; }
    }
}
