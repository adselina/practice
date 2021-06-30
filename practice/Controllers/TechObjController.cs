using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace practice.Controllers
{
    public class TechObjController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
