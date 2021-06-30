using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

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
        postgresContext db = new postgresContext();
        public int AddContact(string phone)
        {
            Contact newContact = new Contact
            {
                Id = default,
                Phone = phone
            };
            db.Contacts.Add(newContact);
            db.SaveChanges();
            return newContact.Id;
        }
        public int AddContact(string phone, string email)
        {
            Contact newContact = new Contact
            {
                Id = default,
                Phone = phone,
                Email = email
            };
            db.Contacts.Add(newContact);
            db.SaveChanges();
            return newContact.Id;
        }
        public int FindContact(string phone)
        {
            return db.Contacts.Where(x => x.Phone == phone).Select(x => x.Id).First();
        }

        public int Update(EnterpriseTable ent)
        {
            postgresContext db = new postgresContext();
            try
            {
                int ContactId = Convert.ToInt32(db.Enterprises.Where(x => x.Id == ent.Id).Join(db.EnterpriseCards,
                    entr => entr.IdCard,
                    card => card.Id,
                    (entr, card) => new { ContactId = card.IdContact }).Join(db.Contacts,
                    cnt => cnt.ContactId,
                    det => det.Id,
                    (bnk, det) => new { IdContact = det.Id }).Select(x=>x.IdContact).First());
                Contact update = new Contact
                {
                    Id = ContactId,
                    Phone = ent.Contact,
                    Email = ent.Email
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

        public int Update(ManufactureTable ent)
        {
            postgresContext db = new postgresContext();
            try
            {
                int ContactId = Convert.ToInt32(db.Enterprises.Where(x => x.Id == ent.Id).Join(db.EnterpriseCards,
                    entr => entr.IdCard,
                    card => card.Id,
                    (entr, card) => new { ContactId = card.IdContact }).Join(db.Contacts,
                    cnt => cnt.ContactId,
                    det => det.Id,
                    (cnt, det) => new { IdContact = det.Id }).Select(x => x.IdContact).First());
                Contact update = new Contact
                {
                    Id = ContactId,
                    Phone = ent.Contact,
                    Email = ent.Email
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
        //public int Update(string phone)
        //{
        //    postgresContext db = new postgresContext();
        //    try
        //    {
        //        int ContactId = Convert.ToInt32(db.Enterprises.Where(x => x.Id == ent.Id).Join(db.EnterpriseCards,
        //            entr => entr.IdCard,
        //            card => card.Id,
        //            (entr, card) => new { ContactId = card.IdContact }).Join(db.Contacts,
        //            cnt => cnt.ContactId,
        //            det => det.Id,
        //            (bnk, det) => new { IdContact = det.Id }).Select(x => x.IdContact).First());
        //        Contact update = new Contact
        //        {
        //            Id = ContactId,
        //            //Phone = ent.Contact,
        //            //Email = ent.Email
        //        };
        //        db.Entry(update).State = EntityState.Modified;
        //        db.SaveChanges();
        //        return 1;
        //    }
        //    catch
        //    {
        //        throw;
        //    }
        //}
        public int Id { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        public virtual ICollection<EnterpriseCard> EnterpriseCards { get; set; }
        public virtual ICollection<Manufacture> Manufactures { get; set; }
        public virtual ICollection<Staff> staff { get; set; }
    }
}
