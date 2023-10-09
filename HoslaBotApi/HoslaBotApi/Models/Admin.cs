using System.ComponentModel.DataAnnotations;

namespace HoslaBotApi.Models
{
    public class Admin
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
