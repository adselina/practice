using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class TechState
    {
        public TechState()
        {
            Controllers = new HashSet<_Controller>();
        }

        public int Id { get; set; }
        public string StateName { get; set; }
        public string StateValue { get; set; }

        public virtual ICollection<_Controller> Controllers { get; set; }
    }
}
