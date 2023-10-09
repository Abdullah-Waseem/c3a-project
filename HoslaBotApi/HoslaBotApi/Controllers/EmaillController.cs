using HoslaBotApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;

namespace HoslaBotApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmaillController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly string _secretKey = "AAimnpoXycH1V2IfDeccFbVvF5+k6586AMoGF4GP7H0= ";

        public EmaillController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // POST api/<EmaillController>
        [HttpPost]
        public void Post(string to, [FromHeader] string token)
        {
            var auth = AuthenticateToken(token);

            if (auth == null)
            {
                return;
            }
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
        private ClaimsPrincipal AuthenticateToken(string token)
        {
            /*if (user_token != token)
            {
                return null;
            }*/

            //Authentication logic
            var tokenHandler = new JwtSecurityTokenHandler();
            var validationParameters = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey)),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false
            };

            try
            {
                // Validate the token
                SecurityToken validatedToken;
                var tokenValidationResult = tokenHandler.ValidateToken(token, validationParameters, out validatedToken);

                return tokenValidationResult;
            }
            catch (SecurityTokenValidationException ex)
            {
                // This exception is thrown when token validation fails (e.g., invalid signature, expired token, etc.)
                return null;
            }
            catch (Exception ex)
            {
                // Handle other exceptions that may occur during token validation
                return null;
            }

        }
    }
}
