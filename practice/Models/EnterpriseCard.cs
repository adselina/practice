using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class EnterpriseCard
    {
        public EnterpriseCard()
        {
            Enterprises = new HashSet<Enterprise>();
        }

        public int Id { get; set; }
        public string EnterpriseNameL { get; set; }
        public string EnterpriseNameS { get; set; }
        public string Ogrn { get; set; }
        public int? IdBankdetails { get; set; }
        public int? IdContact { get; set; }

        public virtual Bankdetail IdBankdetailsNavigation { get; set; }
        public virtual Contact IdContactNavigation { get; set; }
        public virtual ICollection<Enterprise> Enterprises { get; set; }
    }
}
