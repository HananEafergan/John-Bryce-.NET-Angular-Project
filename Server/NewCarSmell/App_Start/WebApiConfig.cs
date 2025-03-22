using System.Web.Http;
using System.Web.Http.Cors;

namespace NewCarSmell
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.EnableCors(new EnableCorsAttribute("http://localhost:4200", "*", "*"));

            // Enable attribute routing
            config.MapHttpAttributeRoutes();

            // Default Web API route
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}