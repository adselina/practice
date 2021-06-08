using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using practice.Models;

namespace practice.Controllers
{
    public class AdditionalControllers : Controller
    {
        [HttpGet]
        [Route("api/post")]
        public IEnumerable<Post> GetPosts()
        {
            Post allpost = new Post();
            return allpost.GetInfo();
        }

        [HttpGet]
        [Route("api/company")]
        public IEnumerable<TechObject> GetTechObject()
        {
            TechObject allobj = new TechObject();
            return allobj.GetInfo();
        }

        ComponentList compList = new ComponentList();
        [HttpGet]
        [Route("api/list")]
        public Dictionary<string, int> List()
        {
            return compList.GetComponentLists();
        }


    }
}
