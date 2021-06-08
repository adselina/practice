using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using practice.Models;

namespace practice.Controllers
{
    public class StaffController : Controller
    {
        StaffTable staff = new StaffTable();
        [HttpGet]
        [Route("api/staff")]
        public IEnumerable<StaffTable> Staff()
        {
            return staff.GetStaffInfo();
        }

        [HttpGet]
        [Route("api/staff/{fild}-{value}")]
        public IEnumerable<StaffTable> FilterStaff(string fild, string value)
        {
            return staff.GetStaffInfo(fild, value);
        }

        [HttpDelete]
        [Route("api/staff/{id}")]
        public int DeleteStaff(int id)
        {
            return staff.DeleteStaff(id);
        }

        [HttpGet]
        [Route("api/staff/edit/{id}")]
        public StaffTable Details(int id)
        {
            return staff.GetStaffData(id);
        }

        [HttpPut]
        [Route("api/staff/edit")]
        public int Edit(StaffTable stf)
        {
            return staff.UpdateStaff(stf);
        }

        [HttpPost]
        [Route("api/staff/create")]
        public int Create(StaffTable stf)
        {

            return staff.AddStaff(stf);
        }
    }
}
