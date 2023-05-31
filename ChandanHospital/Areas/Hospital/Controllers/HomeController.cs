using ChandanHospital.App_Start;
using System.Web.Mvc;

namespace ChandanHospital.Areas.Hospital.Controllers
{
	[HandleError, Compress]
	public class HomeController : Controller
	{
		// GET: Hospital/Home    
		[Compress]
		public ActionResult Index()
		{
			return View();
		}
		[Compress]
		public ActionResult ChandanSpecialists()
		{
			return View();
		}
		[Compress]
		public ActionResult HealthyIndiaMission()
		{
			return View();
		}
		[Compress]
		public ActionResult HealthCheckup()
		{
			return View();
		}
		[Compress]
		public ActionResult Career()
		{
			return View();
		}
		[Compress]
		public ActionResult ContactUs()
		{
			return View();
		}
		public ActionResult ViewDoctorProfile()
		{
			return View();
		}
		[Compress]
		public ActionResult HowToUse()
		{
			return View();
		}
		public ActionResult WhyChandan()
		{
			return View();
		}
		[Compress]
		public ActionResult AdvanceTechnology()
		{
			return View();
		}
		public ActionResult Anaesthesia()
		{
			return View();
		}
		[Compress]
		public ActionResult Appoinment()
		{
			return View();
		}
		[Compress]
		public ActionResult MobDept()
		{
			return View();
		}
        [ActionName("privacy-policy"), Compress]
        public ActionResult PrivacyPolicy()
		{
			return View();
		}
        public ActionResult test()
        {
            return View();
        }
    }
}