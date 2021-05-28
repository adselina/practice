using System;
using System.Collections.Generic;

#nullable disable

namespace practice.Models
{
    public partial class Post
    {
        public Post()
        {
            staff = new HashSet<Staff>();
        }

        public int Id { get; set; }
        public string Postname { get; set; }

        public virtual ICollection<Staff> staff { get; set; }
    }
}
