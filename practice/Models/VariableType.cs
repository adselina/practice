using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class VariableType
    {
        public VariableType()
        {
            Variables = new HashSet<Variable>();
        }

        public int Id { get; set; }
        public string VariableTypeName { get; set; }
        public int? MinValue { get; set; }
        public int? MaxValue { get; set; }
        public string DataType { get; set; }

        public virtual ICollection<Variable> Variables { get; set; }
    }
}
