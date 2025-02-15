using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Church_Event_Manager.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Church_Event_Manager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly EventDBcontext _context;

        public UsersController(EventDBcontext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet, Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<User>>> Getusers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<User>> GetUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound("Sorry, User not found :(");
            }

            return users;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"), Authorize(Roles = "Admin, congregant")]
        public async Task<ActionResult<IEnumerable<User>>> PutUsers(int id, [FromBody] UserDto updatedUser)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null) 
            {
                return NotFound("Sorry, User not found :(");
            }

            // Retreiving the current user's email.
            var currentUserEmail = User?.FindFirstValue(ClaimTypes.Email);

            // Retreiving the current user's email.
            var currentUserRole = User?.FindFirstValue(ClaimTypes.Role);

            //If the user is not authorized to update any other user's info.
            if (currentUserEmail != null && currentUserEmail != user.Email && !User.IsInRole("Admin")) 
            {
                return Unauthorized("You can only update your own credentials :)");
            }

            //Updating user's Name.
            if (!string.IsNullOrWhiteSpace(updatedUser.Name)) 
            {
                user.Name = updatedUser.Name;
            }

            //Updating user's Email.
            if (!string.IsNullOrWhiteSpace(updatedUser.Email) && updatedUser.Email != user.Email) 
            { 
                user.Email = updatedUser.Email;
            }

            //Updating user's Password and hashing it.
            if (!string.IsNullOrWhiteSpace(updatedUser.Password) && updatedUser.Password != user.PasswordHash) 
            {
                user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(updatedUser.Password);
            }

            await _context.SaveChangesAsync();

            return Ok(user);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<User>>> DeleteUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound("Sorry, this user does not exist :(");
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return Ok(await _context.Users.ToListAsync());
        }

        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
