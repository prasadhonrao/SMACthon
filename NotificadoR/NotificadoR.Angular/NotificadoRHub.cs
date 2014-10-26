using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;

namespace NotificadoR.Angular
{
    [HubName("ngHub")]
    public class NotificadoRHub : Hub
    {
        public void Send(string message)
        {
            Clients.All.push(message);
        }
    }
}