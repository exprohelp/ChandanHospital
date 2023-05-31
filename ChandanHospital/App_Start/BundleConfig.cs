using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;

namespace ChandanHospital.App_Start
{
	public class BundleConfig
	{
		public static void RegisterBundles(BundleCollection bundles)
		{
			//Css Bundles
			bundles.Add(new StyleBundle("~/bundles/CommonCss").Include(
				"~/Content/css/bootstrap.min.css",
				"~/Content/css/jquery-ui.min.css",
				"~/Content/css/animate.css",
				"~/Content/css/css-plugin-collections.css",
				"~/Content/css/menuzord-megamenu.css",
				"~/Content/css/menuzord-skins/menuzord-boxed.css",
				"~/Content/css/style-main.css",
				"~/Content/css/utility-classes.css",			
				"~/Content/css/font-awesome-animation.min.css",
				"~/Content/css/preloader.css",
				"~/Content/css/custom-bootstrap-margin-padding.css",
				"~/Content/css/responsive.css",
				"~/Content/css/colors/theme-skin-color-set2.css",
				"~/Content/js/revolution-slider/css/layers.css",
				"~/Content/js/revolution-slider/css/settings.css",
				"~/Content/js/revolution-slider/css/navigation.css"				
				));

			//Js Bundles
			bundles.Add(new ScriptBundle("~/bundles/CommonJs").Include(
				"~/Content/js/jquery-2.2.4.min.js",
				"~/JsModule/global.js",
				"~/Content/js/jquery-plugin-collection.js",
				"~/Content/js/datpikr.js",
				"~/Content/js/bootstrap.min.js",
				"~/Content/js/jquery-ui.min.js",
				"~/Content/js/jquery-plugin-collection.js",
				"~/Content/js/revolution-slider/js/jquery.themepunch.revolution.min.js",
				"~/Content/js/revolution-slider/js/jquery.themepunch.tools.min.js",
				"~/Content/js/custom.js",
				"~/Content/js/revolution-slider/js/extensions/revolution.extension.actions.min.js",
				"~/Content/js/revolution-slider/js/extensions/revolution.extension.carousel.min.js",
				"~/Content/js/revolution-slider/js/extensions/revolution.extension.kenburn.min.js",
				"~/Content/js/revolution-slider/js/extensions/revolution.extension.layeranimation.min.js",
				"~/Content/js/revolution-slider/js/extensions/revolution.extension.migration.min.js",
				"~/Content/js/revolution-slider/js/extensions/revolution.extension.navigation.min.js",
				"~/Content/js/revolution-slider/js/extensions/revolution.extension.parallax.min.js",
				"~/Content/js/revolution-slider/js/extensions/revolution.extension.slideanims.min.js"				
				));
		}
	}
}