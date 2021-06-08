using System;
using System.Collections.Generic;
using System.Linq;

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

        postgresContext db = new postgresContext();
        public int Find(string postName)
        {
            return db.Posts.Where(x => x.Postname == postName).Select(x => x.Id).First();
        }
        public IEnumerable<Post> GetInfo()
        {
            try
            {
                return db.Posts.ToList();
            }
            catch
            {
                throw;
            }
        }
    }

   
}
