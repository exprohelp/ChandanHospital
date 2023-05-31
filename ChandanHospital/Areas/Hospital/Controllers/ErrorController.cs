using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ChandanHospital.Areas.Hospital.Controllers
{
    public class ErrorController : Controller
    {
        // GET: Hospital/Error
        public ActionResult Index()
        {
            return View();
        }
		public ActionResult PageNotFound()
		{
			return View();
		}
    }
}