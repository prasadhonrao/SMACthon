using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(NotificadoR.MVC.Startup))]
namespace NotificadoR.MVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
