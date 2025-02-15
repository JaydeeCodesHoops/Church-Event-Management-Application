namespace Church_Event_Manager.Models
{
    public class AttendanceTrackDto
    {
        public int UserId { get; set; }
        public int EventId { get; set; }
        public string? AttendanceStatus { get; set; }
    }
}
