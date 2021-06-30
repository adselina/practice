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

        [HttpGet]
        [Route("api/allenterprise")]
        public IEnumerable<EnterpriseCard> GetInfo()
        {
            Enterprise allnames = new Enterprise();
            return allnames.GetInfo();
        }

        [HttpGet]
        [Route("api/manufacturetype")]
        public IEnumerable<ManufactureForm> GetManufactureType()
        {
            ManufactureForm allforms = new ManufactureForm();
            return allforms.GetInfo();
        }

        [HttpGet]
        [Route("api/list")]
        public Dictionary<string, int> GetList()
        {
            ComponentList compList = new ComponentList();
            return compList.GetComponentLists();
        }


    }
}
