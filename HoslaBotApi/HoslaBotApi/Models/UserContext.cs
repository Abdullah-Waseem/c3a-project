using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;

namespace HoslaBotApi.Models
{
    public class UserContext:DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options) {
        }
        public DbSet<User> C3A { get; set; }
    }
}
