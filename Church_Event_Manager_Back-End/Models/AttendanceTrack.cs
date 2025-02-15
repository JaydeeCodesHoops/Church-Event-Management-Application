namespace Church_Event_Manager.Models
{
    public class AttendanceTrack
    {
        public int EventId { get; set; } 
        public EventModel? EventModel { get; set; } //navigation property
        public int UserId  { get; set; } 
        public User? User { get; set; } //navigation property
        public string? AttendanceStatus { get; set; } 
    }
}
