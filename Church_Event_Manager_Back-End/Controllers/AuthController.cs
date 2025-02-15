using Church_Event_Manager.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System;

namespace Church_Event_Manager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly EventDBcontext _context;

        public AuthController(IConfiguration configuration, EventDBcontext context)
        {
            _configuration = configuration;
            _context = context;
        }


        [HttpPost("register")]
        [Produces("application/json")]
        //returning a actionResult and "<User>" is displaying the actual result
        public async Task<ActionResult<User>> Register([FromBody] UserDto request) //using the UserDto which is the request model
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password); //hashing the password

            var user = new User
            {
                Name = request.Name,
                Email = request.Email,
                PasswordHash = passwordHash,
                Role = "congregant"
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(user);
        }
        [HttpPost("Login")]
        [Produces("application/json")]
        public async Task<ActionResult<UserDto>> Login([FromBody] UserDto request)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return BadRequest("User not found :(");
            }

            if (!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return BadRequest("Wrong Password :(");
            }

            var token = CreateToken(user);

            return Ok(new { id = user.Id, token, role = user.Role });
        }

        private string CreateToken(User user) 
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, user.Role),
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value!
                ));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.UtcNow.AddYears(100),
                    signingCredentials: creds
                );

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
