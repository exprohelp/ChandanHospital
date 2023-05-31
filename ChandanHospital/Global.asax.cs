using ChandanHospital.App_Start;
using System;
using System.Configuration;
using System.Data.SqlClient;
using System.IO.Compression;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace ChandanHospital
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
			AreaRegistration.RegisterAllAreas();
			RouteConfig.RegisterRoutes(RouteTable.Routes);
			BundleConfig.RegisterBundles(BundleTable.Bundles);
		}
        protected void Application_PreSendRequestHeaders()
        {
            // ensure that if GZip/Deflate Encoding is applied that headers are set
            // also works when error occurs if filters are still active
            HttpResponse response = HttpContext.Current.Response;
            if (response.Filter is GZipStream && response.Headers["Content-encoding"] != "gzip")
                response.AppendHeader("Content-encoding", "gzip");
            else if (response.Filter is DeflateStream && response.Headers["Content-encoding"] != "deflate")
                response.AppendHeader("Content-encoding", "deflate");
        }
        //protected void Application_BeginRequest(object sender, EventArgs e)
        //{
        //	if (!Context.Request.IsSecureConnection)
        //		Response.Redirect(Context.Request.Url.ToString().Replace("http:", "https:"));
        //}
    }
}
