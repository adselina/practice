using System;
using System.Collections.Generic;
using System.Linq;
using Npgsql;
using NpgsqlTypes;

#nullable disable

namespace practice.Models
{

    public class Staff_info
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string DateOfBirth { get; set; }
        public string DateOfHire { get; set; }
        public string Post { get; set; }
        public string Contact { get; set; }
        public string Company { get; set; }

    }
    public class StaffTable
    {
        postgresContext db = new postgresContext();
        public IEnumerable<Staff_info> GetStaffInfo()
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
                        post = stf.post,
                        company = stf.company
                    }).Join(db.TechObjects,
                    stf => stf.company,
                    com => com.Id,
                    (stf, com) => new Staff_info {
                        Id = stf.id,
                        Name = stf.name,
                        DateOfBirth = stf.dateofbirth.Value.Date.ToString("d"),
                        DateOfHire = stf.hiredate.Value.Date.ToString("d"),
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
