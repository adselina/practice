using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class TechConfiguration
    {
        public TechConfiguration()
        {
            Controllers = new HashSet<_Controller>();
        }

        public int Id { get; set; }
        public string ConfigurationName { get; set; }
        public int? MaxSensors { get; set; }
        public TimeSpan? TimeRange { get; set; }

        public virtual ICollection<_Controller> Controllers { get; set; }
    }
}
