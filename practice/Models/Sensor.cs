using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class Sensor
    {
        public Sensor()
        {
            ControllerSensors = new HashSet<ControllerSensor>();
        }

        public int Id { get; set; }
        public string SensorName { get; set; }
        public int? IdSensorType { get; set; }
        public int? IdInVariable { get; set; }

        public virtual InVariable IdInVariableNavigation { get; set; }
        public virtual SensorType IdSensorTypeNavigation { get; set; }
        public virtual ICollection<ControllerSensor> ControllerSensors { get; set; }
    }
}
