using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using practice.Models;

namespace practice.Controllers
{
    public class ManufactureController : Controller
    {
        ManufactureTable manufacture = new ManufactureTable();

        [HttpGet]
        [Route("api/manufacture")]
        public IEnumerable<ManufactureTable> Get()
        {
            return manufacture.GetManufactureInfo();
        }

        [HttpDelete]
        [Route("api/manufacture/{id}")]
        public int Delete(int id)
        {
            return manufacture.DeleteManufacture(id);
        }


        [HttpGet]
        [Route("api/manufacture/edit/{id}")]
        public ManufactureTable Details(int id)
        {
            return manufacture.GetManufactureData(id);
        }

        [HttpPut]
        [Route("api/manufacture/edit")]
        public int Edit(ManufactureTable stf)
        {
            return manufacture.UpdateManufacture(stf);
        }

        [HttpPost]
        [Route("api/manufacture/create")]
        public int Create(ManufactureTable stf)
        {
            return manufacture.AddManufacture(stf);
        }

        [HttpGet]
        [Route("api/manufacture/{fild}-{value}")]
        public IEnumerable<ManufactureTable> Filter(string fild, string value)
        {
            return manufacture.GetManufactureInfo(fild, value);

        }
    }
}
