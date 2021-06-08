using System;
using System.Collections.Generic;
using System.Linq;

#nullable disable

namespace practice.Models
{
    public partial class TechObject
    {
        public TechObject()
        {
            Excavations = new HashSet<Excavation>();
            TechSystems = new HashSet<TechSystem>();
        }
        postgresContext db = new postgresContext();
        public IEnumerable<TechObject> GetInfo()
        {
            return db.TechObjects.ToList();
        }
        public int Find(string techName)
        {
            return db.TechObjects.Where(x => x.TechObjectName == techName).Select(x => x.Id).First();
        }
        public int Id { get; set; }
        public string TechObjectName { get; set; }
        public DateTime? OperationStartDate { get; set; }
        public DateTime? OperationEndDate { get; set; }
        public decimal? Square { get; set; }
        public int? IdManufacture { get; set; }

        public virtual Manufacture IdManufactureNavigation { get; set; }
        public virtual ICollection<Excavation> Excavations { get; set; }
        public virtual ICollection<TechSystem> TechSystems { get; set; }
        public virtual ICollection<Staff> staff { get; set; }
    }
}
