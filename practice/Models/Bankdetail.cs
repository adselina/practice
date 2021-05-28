using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class Bankdetail
    {
        public Bankdetail()
        {
            EnterpriseCards = new HashSet<EnterpriseCard>();
        }

        public int Id { get; set; }
        public string BankName { get; set; }
        public string Inn { get; set; }
        public string Kpp { get; set; }
        public string CheckingAcc { get; set; }
        public string CorrAcc { get; set; }

        public virtual ICollection<EnterpriseCard> EnterpriseCards { get; set; }
    }
}
