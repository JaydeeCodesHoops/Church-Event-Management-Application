using System.ComponentModel.DataAnnotations;

namespace Church_Event_Manager.Models
{
    public class EventModel
    {
        [Key]
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Location { get; set; }
        public DateTime Date { get; set; }
        public ICollection<AttendanceTrack> ?AttendanceTracks { get; set; }
    }
}
