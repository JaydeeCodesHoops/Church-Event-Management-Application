using Church_Event_Manager.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Church_Event_Manager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly EventDBcontext _context;

        public AttendanceController(EventDBcontext context)
        {
            _context = context;
        }
        // GET: api/<AttendanceController>
        [HttpGet, Authorize(Roles = "Admin")]
        public async Task<ActionResult<IEnumerable<AttendanceTrack>>> GetAttendanceTrack()
        {
            return await _context.AttendanceTracks.ToListAsync();
        }

        // GET api/<AttendanceController>/5
        [HttpGet("{eventId}/yes-count"), Authorize(Roles = "Admin")]
        public async Task<ActionResult<int>> GetYesCount(int eventId)
        {
            var yesCount = await _context.AttendanceTracks
                                         .Where(at => at.EventId == eventId && at.AttendanceStatus == "Yes")
                                         .CountAsync();

            return Ok(yesCount);
        }


        // PUT api/<AttendanceController>/5
        [HttpPut("{userId}/{eventId}"), Authorize(Roles = "Admin")]
        public async Task<ActionResult> PutAttendanceTrack(int userId, int eventId, AttendanceTrack attendanceTrack)
        {
            if (userId != attendanceTrack.UserId || eventId != attendanceTrack.EventId)
            {
                return BadRequest();
            }

            _context.Entry(attendanceTrack).State = EntityState.Modified;

            try 
            {
                await _context.SaveChangesAsync();
            }
            catch 
            {
                if (!AttendanceTrackExists(userId, eventId)) 
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

        private bool AttendanceTrackExists(int userId, int eventId)
        {
            // Assuming you have a DbSet<AttendanceTrack> named AttendanceTracks in your EventDBcontext
            return _context.AttendanceTracks.Any(at => at.UserId == userId && at.EventId == eventId);
        }


        // POST api/<AttendanceController>
        [HttpPost, Authorize(Roles = "Admin, congregant")]
        public async Task<ActionResult<AttendanceTrack>> PostAttendanceTrack([FromBody] AttendanceTrackDto attendance)
        {
            // Get the current user's UserId from the claims
            int currentUserId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)); // or the appropriate claim for UserId

            // Validate the input data (ensure attendance status is either "Yes" or "No")
            if (attendance.AttendanceStatus != "Yes" && attendance.AttendanceStatus != "No")
            {
                return BadRequest("AttendanceStatus must be 'Yes' or 'No'.");
            }

            // Check if the user has already marked their attendance for the given event
            if (AttendanceTrackExists(currentUserId, attendance.EventId))
            {
                return Conflict("Attendance record already exists for this event.");
            }

            // Create a new AttendanceTrack with the current user and the event data from the DTO
            var attendanceTrack = new AttendanceTrack
            {
                UserId = currentUserId,  // Assign the current user's ID
                EventId = attendance.EventId, // Assign the requested event they would like to attend
                AttendanceStatus = attendance.AttendanceStatus // Assign Yes or No for attendance tracking
            };

            // Add the attendance record to the context
            _context.AttendanceTracks.Add(attendanceTrack);

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                throw;
            }

            // Return the created attendance track
            return CreatedAtAction("GetAttendanceTrack", new { userId = attendanceTrack.UserId, eventId = attendanceTrack.EventId, attendanceStatus = attendanceTrack.AttendanceStatus});
        }

        // DELETE api/<AttendanceController>/5
        [HttpDelete("{userId}/{eventId}"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteAttendanceTrack(int userId, int eventId)
        {
            var attendanceTrack = await _context.AttendanceTracks.FindAsync(userId, eventId);

            if (attendanceTrack == null) 
            {
                return NotFound();
            }

            _context.AttendanceTracks.Remove(attendanceTrack);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
