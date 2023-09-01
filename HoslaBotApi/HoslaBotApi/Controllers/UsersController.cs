using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HoslaBotApi.Models;

namespace HoslaBotApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserContext _context;

        public UsersController(UserContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
          if (_context.C3A == null)
          {
              return NotFound();
          }
            return await _context.C3A.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{cms_id}")]
        public async Task<ActionResult<User>> GetUser(int cms_id)
        {
          if (_context.C3A == null)
          {
              return NotFound();
          }
            var user = await _context.C3A.FirstOrDefaultAsync(u => u.CMS_ID == cms_id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{cms_id}")]
        public async Task<IActionResult> PutUser(int cms_id, User updatedUser)
        {
            // Ensure that the provided 'cms_id' is unique
            var existingUser = await _context.C3A.FirstOrDefaultAsync(u => u.CMS_ID == cms_id);
            if (existingUser == null)
            {
                return NotFound(); // Return NotFound if the user with the provided CMS_ID doesn't exist
            }

            // Update only the specified fields from the updatedUser object
            if (!string.IsNullOrEmpty(updatedUser.NAME))
            {
                existingUser.NAME = updatedUser.NAME;
            }
            if (!string.IsNullOrEmpty(updatedUser.EMAIL))
            {
                existingUser.EMAIL = updatedUser.EMAIL;
            }
            if (updatedUser.Anger_Score.HasValue)
            {
                existingUser.Anger_Score = updatedUser.Anger_Score;
            }
            if (updatedUser.Depression_Score.HasValue)
            {
                existingUser.Depression_Score = updatedUser.Depression_Score;
            }
            if (updatedUser.Anxiety_Score.HasValue)
            {
                existingUser.Anxiety_Score = updatedUser.Anxiety_Score;
            }
            if (updatedUser.Selfesteem_Score.HasValue)
            {
                existingUser.Selfesteem_Score = updatedUser.Selfesteem_Score;
            }
            if (!string.IsNullOrEmpty(updatedUser.Comments))
            {
                existingUser.Comments = updatedUser.Comments;
            }
            if (!string.IsNullOrEmpty(updatedUser.ClientOfC3A))
            {
                existingUser.ClientOfC3A = updatedUser.ClientOfC3A;
            }

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(cms_id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }



        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            var existingUser = await _context.C3A.FirstOrDefaultAsync(u =>
            u.EMAIL == user.EMAIL &&
            u.NAME == user.NAME &&
            u.CMS_ID == user.CMS_ID);

            if (existingUser != null)
            {
                // User with the same details already exists, return a conflict response
                return Conflict("User with the same email, name, and CMS ID already exists.");
            }

            if (_context.C3A == null)
            {
              return Problem("Entity set 'UserContext.Users'  is null.");
            }

            user.Comments = user.Comments ?? "";
            _context.C3A.Add(user);
            await _context.SaveChangesAsync();


            //sending email logic
            return CreatedAtAction(nameof(GetUser), new { cms_id = user.CMS_ID }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{cms_id}")]
        public async Task<IActionResult> DeleteUser(int cms_id)
        {
            // Find the user based on the provided 'cms_id'
            var user = await _context.C3A.FirstOrDefaultAsync(u => u.CMS_ID == cms_id); 
            if (user == null)
            {
                return NotFound();
            }

            _context.C3A.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int cms_id)
        {
            return (_context.C3A?.Any(e => e.CMS_ID == cms_id)).GetValueOrDefault();
        }
    }
}
