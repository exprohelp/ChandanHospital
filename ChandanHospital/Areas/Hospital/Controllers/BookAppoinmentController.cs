using ChandanHospital.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ChandanHospital.Areas.Hospital.Controllers
{
	[HandleError, Compress]
	public class BookAppoinmentController : Controller
    {
        // GET: Hospital/BookAppoinment
		[Compress]
        public ActionResult Appointment()
        {
            return View();
        }
		[Compress]
		public ActionResult OnlineConsultation()
        {
            return View();
        }
		[Compress]
		public ActionResult BookSchedule()
        {
            return View();
        }
		[Compress]
		public ActionResult AppointmentSuccess()
        {
            return View();
        }
		[Compress]
		public ActionResult Booking()
		{
			return View();
		}
	}
}