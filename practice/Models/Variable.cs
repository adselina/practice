using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class Variable
    {
        public Variable()
        {
            InVariables = new HashSet<InVariable>();
            OutVariables = new HashSet<OutVariable>();
        }

        public int Id { get; set; }
        public string VariableName { get; set; }
        public int? IdVariableType { get; set; }

        public virtual VariableType IdVariableTypeNavigation { get; set; }
        public virtual ICollection<InVariable> InVariables { get; set; }
        public virtual ICollection<OutVariable> OutVariables { get; set; }
    }
}
