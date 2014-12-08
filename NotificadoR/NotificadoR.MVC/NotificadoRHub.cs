using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;

namespace NotificadoR.MVC
{
    [Microsoft.AspNet.SignalR.Hubs.HubName("notificadoRAngularHub")]
    public class NotificadoRHub : Hub
    {
        public void Send(string message)
        {
            Clients.All.broadcastMessage(message);
        }
    }
}