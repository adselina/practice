using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace practice.Models
{
    public partial class EnterpriseCard
    {
        public EnterpriseCard()
        {
            Enterprises = new HashSet<Enterprise>();
        }
        postgresContext db = new postgresContext();

        public int AddEnterpriseCard(EnterpriseTable table)
        {
            Contact cont = new Contact();
            Bankdetail bank = new Bankdetail();
            EnterpriseCard entcard = new EnterpriseCard
            {
                Id = default,
                EnterpriseNameS = table.Name,
                Ogrn = table.Ogrn,
                IdContact = cont.AddContact(table.Contact, table.Email),
                IdBankdetails = bank.AddBankDetails(table.Inn)
            };
            db.EnterpriseCards.Add(entcard);
            db.SaveChanges();
            return entcard.Id;
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

        public int FindCard(string name)
        {
            return db.EnterpriseCards.Where(x => x.EnterpriseNameS == name).Select(x => x.Id).First();
        }
        public int UpdateCard(EnterpriseTable crd)
        {
            try
            {
                Contact contact = new Contact();
                Bankdetail bankDetails = new Bankdetail();
                bankDetails.Update(crd);
                contact.Update(crd);
                EnterpriseCard card = new EnterpriseCard
                {
                    Id = Convert.ToInt32(db.Enterprises.Where(x => x.Id == crd.Id).Join(db.EnterpriseCards,
                    entr => entr.IdCard,
                    card => card.Id,
                    (entr, card) => new { EntCard = card.Id }).Select(x => x.EntCard).First()),
                    IdBankdetails = bankDetails.FindBankDetails(crd.Inn),
                    IdContact = contact.FindContact(crd.Contact),
                    EnterpriseNameS = crd.Name,
                    Ogrn = crd.Ogrn,
                };


                db.Entry(card).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
    }
}
