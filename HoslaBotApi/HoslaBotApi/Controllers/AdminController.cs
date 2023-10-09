using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using HoslaBotApi.Models;

namespace HoslaBotApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly UserContext _context; // Replace with your actual DbContext
        private readonly string _secretKey = "AAimnpoXycH1V2IfDeccFbVvF5+k6586AMoGF4GP7H0= ";

        public AdminController(UserContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Admin adminCredentials)
        {
            // Perform database lookup for the provided username
            var admin = _context.admins.FirstOrDefault(a => a.Username == adminCredentials.Username);

            if (admin == null || !VerifyPassword(adminCredentials.Password, admin.Password))
            {
                // Username not found or password doesn't match, return Unauthorized
                return Unauthorized();
            }

            var token = GenerateToken(admin.Username);
            return Ok(new { Token = token });
        }
        [HttpPost("updatepassword")]
        public IActionResult UpdatePassword(string username, string oldPassword, string newPassword, [FromHeader] string token)
        {
            var auth = AuthenticateToken(token);

            if (auth == null)
            {
                return BadRequest();
            }
            try
            {
                // Perform database lookup for the admin by username
                var admin = _context.admins.FirstOrDefault(a => a.Username == username);

                if (admin == null)
                {
                    // Admin not found, return NotFound
                    return NotFound("Admin not found");
                }

                // Verify the old password before updating
                if (!VerifyPassword(oldPassword, admin.Password))
                {
                    // Old password doesn't match, return Unauthorized
                    return Unauthorized("Old password is incorrect");
                }

                // Update the password with the new one
                admin.Password = newPassword;
                _context.SaveChanges();

                return Ok("Password updated successfully");
            }
            catch (Exception ex)
            {
                // Handle exceptions and return an error response
                return StatusCode(500, $"Error: {ex.Message}");
            }
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

        private bool VerifyPassword(string providedPassword, string storedPassword)
        {
            // Compare the provided plain text password with the stored plain text password
            return providedPassword == storedPassword;
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
