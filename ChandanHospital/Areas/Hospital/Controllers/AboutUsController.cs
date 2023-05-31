using ChandanHospital.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ChandanHospital.Areas.Hospital.Controllers
{
	[HandleError,Compress]
    public class AboutUsController : Controller
    {
		// GET: Hospital/AboutUs
		[Compress]
		public ActionResult ChairmanDesk()
        {
			return View();
		}
		[Compress]
		public ActionResult Mission()
        {
            return View();
        }
		[Compress]
		public ActionResult Milestones()
        {
            return View();
        }
		[Compress]
		public ActionResult Quality()
        {
            return View();
        }
		[Compress]
		public ActionResult Accreditations()
		{
			return View();
		}
		[Compress]
		public ActionResult Affiliation()
        {
            return View();
        }
		[Compress]
		public ActionResult Awards()
        {
            return View();
        }
		[Compress]
		public ActionResult Awards2()
		{
			return View();
		}
		[Compress]
		public ActionResult AboutChandanGroup()
        {
            return View();
        }
		[Compress]
		public ActionResult AboutChandanHospital()
        {
            return View();
        }
		[Compress]
		public ActionResult MilestonesOld()
		{
			return View();
		}
	}
}