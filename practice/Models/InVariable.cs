using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class InVariable
    {
        public InVariable()
        {
            Sensors = new HashSet<Sensor>();
        }

        public int Id { get; set; }
        public int? IdVariable { get; set; }
        public DateTime? InVariableTimestamp { get; set; }
        public string InVariableValue { get; set; }

        public virtual Variable IdVariableNavigation { get; set; }
        public virtual ICollection<Sensor> Sensors { get; set; }
    }
}
