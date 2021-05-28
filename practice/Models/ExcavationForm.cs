using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class ExcavationForm
    {
        public ExcavationForm()
        {
            Excavations = new HashSet<Excavation>();
        }

        public int Id { get; set; }
        public string ExcavationFormName { get; set; }

        public virtual ICollection<Excavation> Excavations { get; set; }
    }
}
