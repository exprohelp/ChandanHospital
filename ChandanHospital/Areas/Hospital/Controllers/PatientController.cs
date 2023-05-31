using ChandanHospital.App_Start;
using System.Web.Mvc;

namespace ChandanHospital.Areas.Hospital.Controllers
{
	[HandleError,Compress]
	public class PatientController : Controller
	{
		// GET: Hospital/Patient
		[Compress]
		public ActionResult PatientLogin()
		{
			return View();
		}
		[Compress]
		public ActionResult PatientReport()
		{
			return View();
		}
		[Compress]
		public ActionResult TA()
		{
			return View();
		}
	}
}