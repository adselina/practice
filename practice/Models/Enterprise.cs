using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using NpgsqlTypes;

#nullable disable

namespace practice.Models
{
    public partial class Enterprise
    {
        public Enterprise()
        {
            Manufactures = new HashSet<Manufacture>();
        }

        public int Id { get; set; }
        public NpgsqlPoint? Coordinates { get; set; }
        public int? HeadEnterprise { get; set; }
        public int? IdCard { get; set; }
        public int? IdPlanfiles { get; set; }

        public virtual Staff HeadEnterpriseNavigation { get; set; }
        public virtual EnterpriseCard IdCardNavigation { get; set; }
        public virtual Planfile IdPlanfilesNavigation { get; set; }
        public virtual ICollection<Manufacture> Manufactures { get; set; }
    }
  
    public class EnterpriseTable
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Head { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
        public string Inn { get; set; }
        public string Ogrn { get; set; }

        postgresContext db = new postgresContext();


        public int DeleteEnterprise(int id)
        {
            try
            {
                Enterprise emp = db.Enterprises.Find(id);
                db.Enterprises.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public int AddEnterprise(EnterpriseTable stf)
        {
            try
            {
                Contact conctact = new Contact();
                EnterpriseCard card = new EnterpriseCard();
                Bankdetail bank = new Bankdetail();
                StaffTable staff = new StaffTable();

                Enterprise newEnterprise = new Enterprise
                {
                    Id = default,
                    IdCard = card.AddEnterpriseCard(stf),
                    HeadEnterprise = staff.FindStaff(stf.Head),
                };
                db.Enterprises.Add(newEnterprise);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public int UpdateEnterprise(EnterpriseTable stf)
        {
            try
            {
                EnterpriseCard card = new EnterpriseCard();
                StaffTable st = new StaffTable();
                card.UpdateCard(stf);
                Enterprise update = new Enterprise
                {
                    Id = stf.Id,
                    HeadEnterprise = st.FindStaff(stf.Head),  
                    IdCard = card.FindCard(stf.Name)
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
        public EnterpriseTable GetEnterpriseData(int id)
        {
            try
            {

                Contact cn = new Contact();
                Staff head = db.staff.Find(id);
                var details = db.Enterprises.Where(x => x.Id == id).Join(db.EnterpriseCards,
                    ent => ent.IdCard,
                    card => card.Id,
                    (ent, card) => new { bankid = card.IdBankdetails, name = card.EnterpriseNameS, idCont = card.IdContact, orgn = card.Ogrn }).First();

                EnterpriseTable info = new EnterpriseTable
                {
                    Id = id,
                    Head = head.Fullname,

                    Name = details.name,
                    Ogrn = details.orgn,
                    Contact = db.Contacts.Where(x => x.Id == details.idCont).Select(x => x.Phone).First(),
                    Email = db.Contacts.Where(x => x.Id == details.idCont).Select(x => x.Email).First(),
                    Inn = db.Bankdetails.Where(x => x.Id == details.bankid).Select(x => x.Inn).First()

                };
                return info;
            }
            catch
            {
                throw;
            }
        }

        public IEnumerable<EnterpriseTable> GetEnterpriseInfo()
        {
            try
            {
                return db.Enterprises.Join(db.EnterpriseCards, 
                    ent => ent.IdCard,
                    card_id => card_id.Id,
                    (ent, card) => new {
                        id = ent.Id,
                        name = card.EnterpriseNameS, 
                        head_id = ent.HeadEnterprise,
                        contact_id = card.IdContact,
                        ogrn = card.Ogrn,
                        bank_id = card.IdBankdetails
                    }).Join(db.staff, 
                    ent_card => ent_card.head_id, 
                    staff => staff.Id,
                    (ent_card, staff) => new {
                        id = ent_card.id,
                        name = ent_card.name,
                        head = staff.Fullname,
                        contact_id = ent_card.contact_id,
                        ogrn = ent_card.ogrn,
                        bank_id = ent_card.bank_id
                    }).Join(db.Bankdetails, 
                    main_data => main_data.bank_id,
                    bank => bank.Id,
                    (main_data, bank) => new { 
                        id = main_data.id,
                        name = main_data.name,
                        inn = bank.Inn,
                        contact_id = main_data.contact_id,
                        head = main_data.head,
                        ogrn = main_data.ogrn
                    }).Join(db.Contacts, 
                    main_data => main_data.contact_id,
                    contact => contact.Id,
                    (main_data, contact) => new EnterpriseTable{
                        Id = main_data.id,
                        Name = main_data.name,
                        Head = main_data.head,
                        Contact = contact.Phone,
                        Email = contact.Email,
                        Inn = main_data.inn,
                        Ogrn = main_data.ogrn
                    }).ToList();
                
            }
            catch
            {
                throw;
            }
        }
    }
    public class ComponentList
    {
        postgresContext db = new postgresContext();
        public Dictionary<string, int> GetComponentLists()
        {
            Dictionary<string, int> names_numbers = new Dictionary<string, int>();
            string[] input = { "Предприятия",
                           "Персонал",
                           "Фабрики" };
            names_numbers.Add(input[0], db.Enterprises.Count());
            names_numbers.Add(input[1], db.staff.Count());
            names_numbers.Add(input[2], db.Buildings.Count());

            return names_numbers;
        }

    }
    

}
