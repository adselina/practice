using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class Contact
    {
        public Contact()
        {
            EnterpriseCards = new HashSet<EnterpriseCard>();
            Manufactures = new HashSet<Manufacture>();
            staff = new HashSet<Staff>();
        }

        public int Id { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        public virtual ICollection<EnterpriseCard> EnterpriseCards { get; set; }
        public virtual ICollection<Manufacture> Manufactures { get; set; }
        public virtual ICollection<Staff> staff { get; set; }
    }
}
