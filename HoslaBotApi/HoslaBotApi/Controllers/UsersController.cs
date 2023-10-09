using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using HoslaBotApi.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using NuGet.Common;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace HoslaBotApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly string _secretKey = "AAimnpoXycH1V2IfDeccFbVvF5+k6586AMoGF4GP7H0= ";
        public string user_token = "";
        private readonly UserContext _context;

        public UsersController(UserContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers([FromHeader] string token)
        {
            var auth = AuthenticateToken(token);

            if (auth == null)
            {
                return BadRequest();
            }

            if (_context.C3A == null)
            {
                return NotFound();
            }
            return await _context.C3A.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{cms_id}")]
        public async Task<ActionResult<User>> GetUser(int cms_id, [FromHeader] string token)
        {
            var auth = AuthenticateToken(token);

            if (auth == null)
            {
                return BadRequest();
            }

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
        public async Task<IActionResult> PutUser(int cms_id, User updatedUser, [FromHeader] string token)
        {
            var auth = AuthenticateToken(token);

            if (auth == null)
            {
                return BadRequest();
            }

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
                var tokens = GenerateToken(existingUser.CMS_ID.ToString());
                user_token = tokens;
                return Ok(new { Token = tokens });
            }

            if (_context.C3A == null)
            {
                return Problem("Entity set 'UserContext.Users'  is null.");
            }

            user.Comments = user.Comments ?? "";
            _context.C3A.Add(user);
            await _context.SaveChangesAsync();

            var token = GenerateToken(user.CMS_ID.ToString());
            user_token = token;
            return Ok(new { Token = token });

        }

        // DELETE: api/Users/5
        [HttpDelete("{cms_id}")]
        public async Task<IActionResult> DeleteUser(int cms_id, [FromHeader] string token)
        {

            var auth = AuthenticateToken(token);

            if (auth == null)
            {
                return BadRequest();
            }
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


        private string GenerateToken(string username)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.UtcNow.AddHours(10), // Token expiration time
                signingCredentials: credentials
            );

            var tokenHandler = new JwtSecurityTokenHandler();
            return tokenHandler.WriteToken(token);
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
