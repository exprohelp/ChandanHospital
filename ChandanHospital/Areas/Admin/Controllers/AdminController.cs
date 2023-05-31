using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ChandanHospital.Areas.Admin.Controllers
{
    public class AdminController : Controller
    {
        // GET: Admin/Admin
        public ActionResult AddDoctors()
        {
            return View();
        }
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }
        public ActionResult MailToEmployee()
        {
            return View();
        }
        public ActionResult UploadAdvertise()
        {
            return View();          
        }
        public ActionResult AdminDashboard()
        {
            return View();
        }
    }
}