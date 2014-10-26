using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace NotificadoR.MVC.Controllers
{

    [EnableCors("*", "*", "*")]
    public class TodoItemController : ApiController
    {
        private NotificadoR_dbEntities db = new NotificadoR_dbEntities();

        // GET: api/TodoItem
        public IEnumerable<TodoItem> Get()
        {
            //return new string[] { "value1", "value2" };
            return db.TodoItems.Where(t => t.complete == false);
        }

        // GET: api/TodoItem/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/TodoItem
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/TodoItem/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/TodoItem/5
        public void Delete(int id)
        {
        }
    }
}
