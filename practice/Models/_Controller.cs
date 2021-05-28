using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class _Controller
    {
        public _Controller()
        {
            Commands = new HashSet<Command>();
            ControllerSensors = new HashSet<ControllerSensor>();
        }

        public int Id { get; set; }
        public string ControllerName { get; set; }
        public int? IdState { get; set; }
        public int? IdConfiguration { get; set; }

        public virtual TechConfiguration IdConfigurationNavigation { get; set; }
        public virtual TechState IdStateNavigation { get; set; }
        public virtual ICollection<Command> Commands { get; set; }
        public virtual ICollection<ControllerSensor> ControllerSensors { get; set; }
    }
}
