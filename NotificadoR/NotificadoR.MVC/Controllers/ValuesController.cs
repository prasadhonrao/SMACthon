using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.SignalR;

namespace NotificadoR.MVC.Controllers
{
    public class ValuesController : ApiController
    {
        // GET: api/Values
        public string Get()
        {
            var context = GlobalHost.ConnectionManager.GetHubContext<NotificadoR.Angular.NotificadoRHub>();
            context.Clients.All.Send("");
            return "";
        }

        // GET: api/Values/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Values
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Values/5
        public void Delete(int id)
        {
        }
    }
}
