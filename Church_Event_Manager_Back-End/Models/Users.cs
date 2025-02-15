using System.ComponentModel.DataAnnotations;

namespace Church_Event_Manager.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }
        public string? Name { get; set; }
        public string? Role { get; set; } // Admin or congregant
        public ICollection<AttendanceTrack>? AttendanceTracks { get; set; }
    }
}
