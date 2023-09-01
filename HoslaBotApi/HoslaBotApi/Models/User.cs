using System.ComponentModel.DataAnnotations;

namespace HoslaBotApi.Models
{
    public class User
    {
        [Key]
        public int CMS_ID { get; set; }
        public string NAME { get; set; }
        public string EMAIL { get; set; }
        public int? Anger_Score { get; set; }
        public int? Depression_Score { get; set; }
        public int? Anxiety_Score { get; set; }
        public int? Selfesteem_Score { get; set; }
        public string Comments { get; set; }
        public string ClientOfC3A { get; set; }
        public string Email_Sent{ get; set; }


    }
}
