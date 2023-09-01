using HoslaBotApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Net;
using System.Net.Mail;

namespace HoslaBotApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmaillController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public EmaillController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // POST api/<EmaillController>
        [HttpPost]
        public void Post(string to)
        {
            string fromEmail = _configuration["Email:From"];
            string password = _configuration["Email:Password"];
            string host = _configuration["Email:Host"];
            int port =Convert.ToInt32( _configuration["Email:Port"]);

            Email email = new Email
            {
                to = to
            };

            SendEmail(email, fromEmail, password,host,port);
        }

        private void SendEmail(Email email, string fromEmail, string password,string host,int port)
        {
            MailMessage mail = new MailMessage();
            mail.IsBodyHtml = true;
            mail.Subject = Email.subject;
            mail.Body = Email.body;

            mail.From = new System.Net.Mail.MailAddress(fromEmail);

            //SMTP & Network Credential Setting
            SmtpClient smtp = new SmtpClient();
            smtp.UseDefaultCredentials = false;
            smtp.Host = host;
            smtp.Credentials = new NetworkCredential(fromEmail, password);
            smtp.EnableSsl = true;

            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12 | SecurityProtocolType.Tls11 | SecurityProtocolType.Tls;
            smtp.Port = port;

            MailAddress mailAddress = new MailAddress(email.to);
            mail.To.Add(mailAddress);

            smtp.Send(mail);
        }
    }
}
