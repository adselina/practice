using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class ControllerSensor
    {
        public int? IdController { get; set; }
        public int? IdSensor { get; set; }
        public int Id { get; set; }

        public virtual _Controller IdControllerNavigation { get; set; }
        public virtual Sensor IdSensorNavigation { get; set; }
    }
}
