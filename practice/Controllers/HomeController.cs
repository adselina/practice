using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using practice.Models;

namespace practice.Controllers
{
    public class HomeController : Controller
    {
        EnterpriseTable objEnterprise = new EnterpriseTable();

        [HttpGet]
        [Route("api/enterprise")]
        public IEnumerable<Enterprise_info> Enterprise()
        {
            return objEnterprise.GetEnterpriseInfo();
        }

        [HttpDelete]
        [Route("api/enterprise/{id}")]
        public int Delete(int id)
        {
            return objEnterprise.DeleteEmployee(id);
        }

        ComponentList compList = new ComponentList();
        [HttpGet]
        [Route("api/list")]
        public Dictionary<string,int> List()
        {
            return compList.GetComponentLists();
        }

        StaffTable staff = new StaffTable();
        [HttpGet]
        [Route("api/staff")]
        public IEnumerable<Staff_info> Staff()
        {
            return staff.GetStaffInfo();
        }

        [HttpDelete]
        [Route("api/staff/{id}")]
        public int DeleteStaff(int id)
        {
            return staff.DeleteStaff(id);
        }


    }
}
