using System;
using System.Collections.Generic;
using System.Net;

#nullable disable

namespace practice.Models
{
    public partial class Planfile
    {
        public Planfile()
        {
            Enterprises = new HashSet<Enterprise>();
        }

        public int Id { get; set; }
        public IPAddress Planlink { get; set; }
        public IPAddress Modellink { get; set; }

        public virtual ICollection<Enterprise> Enterprises { get; set; }
    }
}
