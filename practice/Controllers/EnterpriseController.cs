using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using practice.Models;

namespace practice.Controllers
{
    public class EnterpriseController : Controller
    {
        EnterpriseTable objEnterprise = new EnterpriseTable();

        [HttpGet]
        [Route("api/enterprise")]
        public IEnumerable<EnterpriseTable> Enterprise()
        {
            return objEnterprise.GetEnterpriseInfo();
        }

       
        [HttpDelete]
        [Route("api/enterprise/{id}")]
        public int Delete(int id)
        {
            return objEnterprise.DeleteEnterprise(id);
        }

        
        [HttpGet]
        [Route("api/enterprise/edit/{id}")]
        public EnterpriseTable Details(int id)
        {
            return objEnterprise.GetEnterpriseData(id);
        }

        [HttpPut]
        [Route("api/enterprise/edit")]
        public int Edit(EnterpriseTable stf)
        {
            return objEnterprise.UpdateEnterprise(stf);
        }

        [HttpPost]
        [Route("api/enterprise/create")]
        public int Create(EnterpriseTable stf)
        {
            return objEnterprise.AddEnterprise(stf);
        }





    }
}
