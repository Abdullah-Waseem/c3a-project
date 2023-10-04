using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Diagnostics.Eventing.Reader;
using System.Net.Http;

namespace HoslaBotApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QalamApiController : ControllerBase
    {
        private readonly ILogger<QalamApiController> _logger;

        private readonly IConfiguration _configuration;
        private readonly string? authUrl;
        object authPayload;

        public QalamApiController(IConfiguration configuration, ILogger<QalamApiController> logger)
        {
            _configuration = configuration;
            _logger = logger;

            authUrl = _configuration["QalamApi:AuthUrl"];

            authPayload = new
            {
                jsonrpc = "2.0",
                @params = new
                {
                    db = _configuration["QalamApi:DbName"],
                    login = _configuration["QalamApi:Login"],
                    password = _configuration["QalamApi:Password"]
                }
            };

        }



        [HttpGet]
        public async Task<string> authenticate(string cms, string username, string useremail, string usercnic)
        {
            string fullCms = "00000" + cms;
            _logger.LogInformation("Authentication method started for CMS: {cms}", cms);


            using (HttpClient httpClient = new HttpClient())
            {
                _logger.LogInformation("Auth URL: {authUrl}", authUrl);
                _logger.LogInformation("Auth Payload: {authPayload}", JsonConvert.SerializeObject(authPayload));
                HttpResponseMessage authResponse = await httpClient.PostAsJsonAsync(authUrl, authPayload);
                string sessionCookie = authResponse.Headers.GetValues("Set-Cookie")?.FirstOrDefault()?.Split(',')[0];

                string checkUrl = _configuration["QalamApi:CheckUrl"];
                var checkPayload = new
                {
                    jsonrpc = "2.0",
                    @params = new
                    {
                        code = fullCms,
                        cnic = usercnic,
                        email = useremail,
                        name = username

                    }
                };

                _logger.LogInformation("Check URL: {checkUrl}", checkUrl);
                _logger.LogInformation("Check Payload: {checkPayload}", JsonConvert.SerializeObject(checkPayload));
                _logger.LogInformation("Check cookie: {sessionCookie}", sessionCookie);

                httpClient.DefaultRequestHeaders.Add("Cookie", sessionCookie);
                HttpResponseMessage checkResponse = await httpClient.PostAsJsonAsync(checkUrl, checkPayload);
                var checkData = await checkResponse.Content.ReadAsStringAsync();
                _logger.LogInformation("Response from API: {checkData}", checkData);

                return checkData;
            }
        }
    }
}
