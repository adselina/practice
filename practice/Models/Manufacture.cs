using System;
using System.Linq;
using System.Collections.Generic;
using NpgsqlTypes;
using Microsoft.EntityFrameworkCore;

#nullable disable

namespace practice.Models
{
    public partial class Manufacture
    {
        public Manufacture()
        {
            Buildings = new HashSet<Building>();
            TechObjects = new HashSet<TechObject>();
        }

        public int Id { get; set; }
        public string ManufactureName { get; set; }
        public NpgsqlPoint? Coordinates { get; set; }
        public int? IdBoss { get; set; }
        public int? IdEnterprise { get; set; }
        public int? IdManufactureForm { get; set; }
        public int? IdContact { get; set; }

        public virtual Staff IdBossNavigation { get; set; }
        public virtual Contact IdContactNavigation { get; set; }
        public virtual Enterprise IdEnterpriseNavigation { get; set; }
        public virtual ManufactureForm IdManufactureFormNavigation { get; set; }
        public virtual ICollection<Building> Buildings { get; set; }
        public virtual ICollection<TechObject> TechObjects { get; set; }
    }

    public class ManufactureTable
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Enterprise { get; set; }
        public string Head { get; set; }
        public string Contact { get; set; }
        public string Email { get; set; }
        public string Type { get; set; }
        public int C_building { get; set; }
        public int C_techobj { get; set; }

        postgresContext db = new postgresContext();

        public IEnumerable<ManufactureTable> GetManufactureInfo()
        {
            try
            {
                return db.Manufactures.Join(db.ManufactureForms,
                    manuf => manuf.IdManufactureForm,
                    type => type.Id,
                    (manuf, type) => new
                    {
                        Id = manuf.Id,
                        EnterpriseId = manuf.IdEnterprise,
                        ManufactureName = manuf.ManufactureName,
                        IdBoss = manuf.IdBoss,
                        IdContact = manuf.IdContact,
                        ManufactureTypeName = type.ManufactureTypeName
                    }).Join(db.Enterprises,
                    manuf => manuf.EnterpriseId,
                    ent => ent.Id,
                    (manuf, ent) => new
                    {
                        Id = manuf.Id,
                        EnterpriseName = db.EnterpriseCards
                        .Where(x => x.Id == db.Enterprises.Where(x=>x.Id == manuf.EnterpriseId).Select(x=>x.IdCard).First())
                        .Select(x=>x.EnterpriseNameS).First(),

                        ManufactureName = manuf.ManufactureName,
                        IdBoss = manuf.IdBoss,
                        IdContact = manuf.IdContact,
                        ManufactureTypeName = manuf.ManufactureTypeName
                    }).Join(db.Contacts,
                    manuf => manuf.IdContact,
                    contact => contact.Id,
                    (manuf, contact) => new
                    {
                        Id = manuf.Id,
                        EnterpriseName = manuf.EnterpriseName,
                        ManufactureName = manuf.ManufactureName,
                        IdBoss = manuf.IdBoss == null ? 0 : manuf.IdBoss,
                        Phone = contact.Phone,
                        ManufactureTypeName = manuf.ManufactureTypeName
                    }).Join(db.staff,
                    manuf => manuf.IdBoss,
                    staff => staff.Id,
                    (manuf, staff) => new ManufactureTable
                    {
                        Id = manuf.Id,
                        Enterprise = manuf.EnterpriseName,
                        Name = manuf.ManufactureName,
                        Head = staff.Fullname=="-" ? "-" : staff.Fullname,
                        Contact = manuf.Phone,
                        Type = manuf.ManufactureTypeName,
                        C_building = db.Buildings.Where(x => x.IdManufacture == manuf.Id).Count(),
                        C_techobj = db.TechObjects.Where(x => x.IdManufacture == manuf.Id).Count()
                    }).ToList();
            }
            catch
            {
                throw;
            }
        }
        public IEnumerable<ManufactureTable> GetManufactureInfo(string fild, string value)
        {
            try
            {
                var info = db.Manufactures.Join(db.ManufactureForms,
                    manuf => manuf.IdManufactureForm,
                    type => type.Id,
                    (manuf, type) => new
                    {
                        Id = manuf.Id,
                        EnterpriseId = manuf.IdEnterprise,
                        ManufactureName = manuf.ManufactureName,
                        IdBoss = manuf.IdBoss,
                        IdContact = manuf.IdContact,
                        ManufactureTypeName = type.ManufactureTypeName
                    }).Join(db.Enterprises,
                    manuf => manuf.EnterpriseId,
                    ent => ent.Id,
                    (manuf, ent) => new
                    {
                        Id = manuf.Id,
                        EnterpriseName = db.EnterpriseCards
                        .Where(x => x.Id == db.Enterprises.Where(x => x.Id == manuf.EnterpriseId).Select(x => x.IdCard).First())
                        .Select(x => x.EnterpriseNameS).First(),

                        ManufactureName = manuf.ManufactureName,
                        IdBoss = manuf.IdBoss,
                        IdContact = manuf.IdContact,
                        ManufactureTypeName = manuf.ManufactureTypeName
                    }).Join(db.Contacts,
                    manuf => manuf.IdContact,
                    contact => contact.Id,
                    (manuf, contact) => new
                    {
                        Id = manuf.Id,
                        EnterpriseName = manuf.EnterpriseName,
                        ManufactureName = manuf.ManufactureName,
                        IdBoss = manuf.IdBoss == null ? 0 : manuf.IdBoss,
                        Phone = contact.Phone,
                        ManufactureTypeName = manuf.ManufactureTypeName
                    }).Join(db.staff,
                    manuf => manuf.IdBoss,
                    staff => staff.Id,
                    (manuf, staff) => new ManufactureTable
                    {
                        Id = manuf.Id,
                        Enterprise = manuf.EnterpriseName,
                        Name = manuf.ManufactureName,
                        Head = staff.Fullname == "-" ? "-" : staff.Fullname,
                        Contact = manuf.Phone,
                        Type = manuf.ManufactureTypeName,
                        C_building = db.Buildings.Where(x => x.IdManufacture == manuf.Id).Count(),
                        C_techobj = db.TechObjects.Where(x => x.IdManufacture == manuf.Id).Count()
                    });
                switch (fild)
                {
                    case "Type":
                        info = info.Where(x => x.Type == value);
                        break;
                    case "ManufactureName":
                        info = info.Where(x => x.Name == value);
                        break;
                    case "Enterprise":
                        info = info.Where(x => x.Enterprise == value);
                        break;
                }
                return info;
            }
            catch
            {
                throw;
            }
        }
        public ManufactureTable GetManufactureData(int id)
        {
            try
            {
                Contact cn = new Contact();
                Manufacture manuf = db.Manufactures.Find(id);
                var details = db.Manufactures.Where(x => x.Id == id).Join(db.Enterprises,
                    m => m.IdEnterprise,
                    ent => ent.Id,
                    (m, ent) => new { contact = m.IdContact, mType = m.IdManufactureForm, boss = m.IdBoss ==null? 0: m.IdBoss, id_card = ent.IdCard }).Join(db.EnterpriseCards,
                    m => m.id_card,
                    ent => ent.Id,
                    (m, ent) => new { contact = m.contact, mType = m.mType, boss = m.boss, name = ent.EnterpriseNameS })
                .Join(db.staff,
                m => m.boss,
                stf => stf.Id,
                (m, stf) => new { contact = m.contact, mType = m.mType, boss = stf.Fullname, name = m.name }).Join(db.Contacts,
                m => m.contact,
                con => con.Id,
                (m, con) => new { contact = con.Phone, email = con.Email, mType = m.mType, boss = m.boss, name = m.name }).Join(db.ManufactureForms,
                m => m.mType,
                con => con.Id,
                (m, con) => new { contact = m.contact, email = m.email, mType = con.ManufactureTypeName, boss = m.boss, name = m.name }).FirstOrDefault();


                ManufactureTable info = new ManufactureTable
                {
                    Id = manuf.Id,
                    Enterprise = details.name,
                    Name = manuf.ManufactureName,
                    Head = details.boss,
                    Contact = details.contact,
                    Email = details.email,
                    Type = details.mType,

                };
                return info;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteManufacture(int id)
        {
            try
            {
                Manufacture emp = db.Manufactures.Find(id);
                db.Manufactures.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public int UpdateManufacture(ManufactureTable stf)
        {
            try
            {
                Contact contact = new Contact();
                StaffTable staff = new StaffTable();
                EnterpriseTable ent = new EnterpriseTable();
                ManufactureForm m = new ManufactureForm();
                contact.Update(stf);
                Manufacture update = new Manufacture
                {
                    Id = stf.Id,
                    IdBoss = staff.FindStaff(stf.Head),
                    IdEnterprise = ent.FindEnterprise(stf.Enterprise),
                    ManufactureName = stf.Name,
                    IdContact = contact.FindContact(stf.Contact),
                    IdManufactureForm = db.ManufactureForms.Where(x => x.ManufactureTypeName == stf.Type).Select(x => x.Id).First()
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
        public int AddManufacture(ManufactureTable stf)
        {
            try
            {
                Contact conctact = new Contact();
                StaffTable staff = new StaffTable();
                EnterpriseTable ent = new EnterpriseTable();
                ManufactureForm m = new ManufactureForm();
                Manufacture newManufacture = new Manufacture
                {
                    Id = default,
                    IdBoss = staff.FindStaff(stf.Head),
                    IdContact = conctact.AddContact(stf.Contact, stf.Email),
                    IdEnterprise = ent.FindEnterprise(stf.Enterprise),
                    ManufactureName = stf.Name,
                    IdManufactureForm = db.ManufactureForms.Where(x => x.ManufactureTypeName == stf.Type).Select(x => x.Id).First()
                };

                db.Manufactures.Add(newManufacture);
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
