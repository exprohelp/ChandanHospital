using ChandanHospital.App_Start;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ChandanHospital.Areas.Hospital.Controllers
{
	[HandleError,Compress]
	public class DepartmentController : Controller
    {
        // GET: Hospital/Department
		[Compress]
        public ActionResult DepartmentInfo()
        {
            return View();
        }
		[Compress]
		public ActionResult DepartmentMenu()
		{
			return View();
		}
		[ActionName("orthopaedics-bone-joint-surgery"), Compress]
        public ActionResult OrthopaedicsBoneJointSurgery()
        {
            return View();
        }
        [ActionName("trauma-and-emergency-medicine"), Compress]
        public ActionResult TraumaAndEmergencyMedicine()
        {
            return View();
        }     
        [ActionName("cardiology")]
        public ActionResult Cardiology()
        {
            return View();
        }
        [ActionName("critical-care-and-anaesthesiology")]
        public ActionResult CriticalCareAndAnaesthesiology()
        {
            return View();
        }
        [ActionName("dental-science"), Compress]
        public ActionResult DentalScience()
        {
            return View();
        }
        [ActionName("dermatology"), Compress]
        public ActionResult Dermatology()
        {
            return View();
        }
        [ActionName("ent"), Compress]
        public ActionResult Ent()
        {
            return View();
        }
        [ActionName("gastro-liver-and-biliary-science"), Compress]
        public ActionResult GastroLiverAndBiliaryScience()
        {
            return View();
        }
        [ActionName("general-surgery"), Compress]
        public ActionResult GeneralSurgery()
        {
            return View();
        }
        [ActionName("Cancer"), Compress]
        public ActionResult Cancer()
        {
            return View();
        }
        [ActionName("immunology-endocrinology"), Compress]
        public ActionResult ImmunologyEndocrinology()
        {
            return View();
        }
        [ActionName("internal-medicine"), Compress]
        public ActionResult InternalMedicine()
        {
            return View();
        }
        [ActionName("interventional-radiology"), Compress]
        public ActionResult InterventionalRadiology()
        {
            return View();
        }
        [ActionName("nephrology-urology"), Compress]
        public ActionResult NephrologyUrology()
        {
            return View();
        }
        [ActionName("neuro-science"), Compress]
        public ActionResult NeuroScience()
        {
            return View();
        }
        [ActionName("obstetrics-and-gynaecology"), Compress]
        public ActionResult ObstetricsAndGynaecology()
        {
            return View();
        }
        [ActionName("ophthalmology-and-lasik"), Compress]
        public ActionResult OphthalmologyAndLasik()
        {
            return View();
        }
        [ActionName("paediatrics-and-neonatology"), Compress]
        public ActionResult PaediatricsAndNeonatology()
        {
            return View();
        }
        [ActionName("pain-management"), Compress]
        public ActionResult PainManagement()
        {
            return View();
        }
        [ActionName("plastic-surgery"), Compress]
        public ActionResult PlasticSurgery()
        {
            return View();
        }
        [ActionName("mental-health-and-behavioural-science"), Compress]
        public ActionResult MentalHealthAndBehaviouralScience()
        {
            return View();
        }
        [ActionName("spinal-surgery"), Compress]
		public ActionResult SpinalSurgery()
		{
			return View();
		}
		[ActionName("blood-bank"), Compress]
        public ActionResult BloodBank()
        {
            return View();
        }
		[ActionName("respiratory-sleep-medicine"), Compress]
		public ActionResult RespiratorSleepMedicine()
		{
			return View();
		}
		[Compress]
		public ActionResult ViewDoctorProfileRep()
        {
            return View();
        }
		[Compress]
		public ActionResult mobdept()
        {
            return View();
        }
		[Compress]
        public ActionResult WhatWeTreat()
        {
            return View();
        }
    }
}