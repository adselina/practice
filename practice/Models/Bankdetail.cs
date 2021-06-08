using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace practice.Models
{
    public partial class Bankdetail
    {
        public Bankdetail()
        {
            EnterpriseCards = new HashSet<EnterpriseCard>();
        }
        postgresContext db = new postgresContext();
        public int AddBankDetails(string inn)
        {
            Bankdetail newBankDetail = new Bankdetail
            {
                Id = default,
                Inn = inn
            };
            db.Bankdetails.Add(newBankDetail);
            db.SaveChanges();
            return newBankDetail.Id;

        }
        public int Id { get; set; }
        public string BankName { get; set; }
        public string Inn { get; set; }
        public string Kpp { get; set; }
        public string CheckingAcc { get; set; }
        public string CorrAcc { get; set; }

        public int FindBankDetails(string inn)
        {
            return db.Bankdetails.Where(x => x.Inn == inn).Select(x => x.Id).First();
        }
        public int Update(EnterpriseTable ent)
        {
            postgresContext db = new postgresContext();
            try
            {
                Enterprise enterprise = new Enterprise();
                EnterpriseCard enrCard = new EnterpriseCard();
                int bankId = Convert.ToInt32(db.Enterprises.Where(x => x.Id == ent.Id).Join(db.EnterpriseCards,
                    entr => entr.IdCard,
                    card => card.Id,
                    (entr, card) => new { BankdId = card.IdBankdetails }).Join(db.Bankdetails,
                    bnk => bnk.BankdId,
                    det => det.Id,
                    (bnk, det) => new { IdBankDetails = det.Id }).Select(x => x.IdBankDetails).First());
                Bankdetail update = new Bankdetail
                {
                    Id = bankId,
                    Inn = ent.Inn
                };
                db.Entry(update).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public virtual ICollection<EnterpriseCard> EnterpriseCards { get; set; }
    }
}
