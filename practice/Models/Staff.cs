using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Npgsql;
using NpgsqlTypes;

#nullable disable

namespace practice.Models
{


    public class StaffTable
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime? DateOfHire { get; set; }
        public string Post { get; set; }
        public string Contact { get; set; }
        public string Company { get; set; }

        postgresContext db = new postgresContext();
        public IEnumerable<StaffTable> GetStaffInfo()
        {
            try
            {
                return db.staff.Join(db.Posts,
                    stf => stf.IdPost,
                    pst => pst.Id,
                    (stf, pst) => new
                    {
                        id = stf.Id,
                        hiredate = stf.HireDate,
                        dateofbirth = stf.DateOfBirth,
                        name = stf.Fullname,
                        contact = stf.IdContact,
                        idpost = stf.IdPost,
                        post = pst.Postname,
                        company = stf.IdTechObject
                    }).Join(db.Contacts,
                    stf => stf.contact,
                    cntct => cntct.Id,
                    (stf, cntct) => new
                    {
                        id = stf.id,
                        hiredate = stf.hiredate,
                        dateofbirth = stf.dateofbirth,
                        name = stf.name,
                        contact = cntct.Phone,
                        idpost = stf.idpost,
                        post = stf.post,
                        company = stf.company
                    }).Join(db.TechObjects,
                    stf => stf.company,
                    com => com.Id,
                    (stf, com) => new StaffTable
                    {
                        Id = stf.id,
                        Name = stf.name,
                        DateOfBirth = stf.dateofbirth,
                        DateOfHire = stf.hiredate,
                        Post = stf.post,
                        Contact = stf.contact,
                        Company = com.TechObjectName
                    });
            }
            catch
            {
                throw;
            }
        }
        public IEnumerable<StaffTable> GetStaffInfo(string fild, string value)
        {
            try
            {
                var info = db.staff.Join(db.Posts,
                    stf => stf.IdPost,
                    pst => pst.Id,
                    (stf, pst) => new
                    {
                        id = stf.Id,
                        hiredate = stf.HireDate,
                        dateofbirth = stf.DateOfBirth,
                        name = stf.Fullname,
                        contact = stf.IdContact,
                        idpost = stf.IdPost,
                        post = pst.Postname,
                        company = stf.IdTechObject
                    }).Join(db.Contacts,
                    stf => stf.contact,
                    cntct => cntct.Id,
                    (stf, cntct) => new
                    {
                        id = stf.id,
                        hiredate = stf.hiredate,
                        dateofbirth = stf.dateofbirth,
                        name = stf.name,
                        contact = cntct.Phone,
                        idpost = stf.idpost,
                        post = stf.post,
                        company = stf.company
                    }).Join(db.TechObjects,
                    stf => stf.company,
                    com => com.Id,
                    (stf, com) => new StaffTable
                    {
                        Id = stf.id,
                        Name = stf.name,
                        DateOfBirth = stf.dateofbirth,
                        DateOfHire = stf.hiredate,
                        Post = stf.post,
                        Contact = stf.contact,
                        Company = com.TechObjectName
                    });
                switch (fild)
                {
                    case "Fullname":
                        info = info.Where(x => x.Name == value);
                        break;
                    case "TechObjectName":
                        info = info.Where(x => x.Company == value);
                        break;
                    case "Postname":
                        info = info.Where(x => x.Post == value);
                        break;
                }
                return info;
            }
            catch
            {
                throw;
            }
        }

        public StaffTable GetStaffData(int id)
        {
            try
            {
                Contact cn = new Contact();
                Staff employee = db.staff.Find(id);
                StaffTable info = new StaffTable
                {
                    Id = employee.Id,
                    Name = employee.Fullname,
                    DateOfBirth = employee.DateOfBirth,
                    DateOfHire = employee.HireDate,
                    Contact = db.staff.Where(x => x.Id == id).Join(db.Contacts,
                    stf => stf.IdContact,
                    cn => cn.Id,
                    (stf, cn) => new { phone = cn.Phone }).Select(x => x.phone).First(),
                    Post = db.staff.Where(x => x.Id == id).Join(db.Posts,
                    stf => stf.IdPost,
                    pst => pst.Id,
                    (stf, pst) => new { post = pst.Postname }).Select(x => x.post).First(),
                    Company = db.staff.Where(x => x.Id == id).Join(db.TechObjects,
                    stf => stf.IdTechObject,
                    tech => tech.Id,
                    (stf, tech) => new { post = tech.TechObjectName }).Select(x => x.post).First()

                };
                return info;
            }
            catch
            {
                throw;
            }
        }

        public int DeleteStaff(int id)
        {
            try
            {
                Staff emp = db.staff.Find(id);
                db.staff.Remove(emp);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public int UpdateStaff(StaffTable stf)
        {
            try
            {
                Contact conctact = new Contact();
                Post post = new Post();
                TechObject techObject = new TechObject();
                Staff newStaff = new Staff
                {
                    Id = stf.Id,
                    Fullname = stf.Name,
                    DateOfBirth = Convert.ToDateTime(stf.DateOfBirth),
                    HireDate = Convert.ToDateTime(stf.DateOfHire),
                    IdPost = post.Find(stf.Post),
                    IdTechObject = techObject.Find(stf.Company),
                    IdContact = conctact.AddContact(stf.Contact)
                };
                db.Entry(newStaff).State = EntityState.Modified;
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        } 
        public int AddStaff(StaffTable stf)
        {
            try
            {
                Contact conctact = new Contact();
                Post post = new Post();
                TechObject techObject = new TechObject();
                Staff newStaff = new Staff
                {
                    Id = default,
                    Fullname = stf.Name,
                    DateOfBirth = Convert.ToDateTime(stf.DateOfBirth),
                    HireDate = Convert.ToDateTime(stf.DateOfHire),
                    IdPost = post.Find(stf.Post),
                    IdTechObject = techObject.Find(stf.Company),
                    IdContact = conctact.AddContact(stf.Contact)
                };
                db.staff.Add(newStaff);
                db.SaveChanges();
                return 1;
            }
            catch
            {
                throw;
            }
        }
        public int FindStaff(string staffname)
        {
            return db.staff.Where(x => x.Fullname == staffname).Select(x => x.Id).First();
        }
    }
    
    public partial class Staff
    {
        public Staff()
        {
            Enterprises = new HashSet<Enterprise>();
            Manufactures = new HashSet<Manufacture>();
        }

        public int Id { get; set; }
        public string Fullname { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime? HireDate { get; set; }
        public DateTime? DismissDate { get; set; }
        public int? IdPost { get; set; }
        public int? IdContact { get; set; }
        public int? IdTechObject { get; set; }

        public virtual Contact IdContactNavigation { get; set; }
        public virtual Post IdPostNavigation { get; set; }
        public virtual TechObject IdTechObjectNavigation { get; set; }
        public virtual ICollection<Enterprise> Enterprises { get; set; }
        public virtual ICollection<Manufacture> Manufactures { get; set; }
    }
    
}
