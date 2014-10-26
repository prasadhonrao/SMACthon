using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace NotificadoR.HTML
{
    [Microsoft.AspNet.SignalR.Hubs.HubName("notificadoRHTMLHub")]
    public class NotificadoRHub : Hub
    {
        public void Send(string message)
        {
            Clients.All.broadcastMessage(message);
        }
    }
}