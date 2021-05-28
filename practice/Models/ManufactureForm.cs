using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class ManufactureForm
    {
        public ManufactureForm()
        {
            Manufactures = new HashSet<Manufacture>();
        }

        public int Id { get; set; }
        public string ManufactureTypeName { get; set; }

        public virtual ICollection<Manufacture> Manufactures { get; set; }
    }
}
