namespace Church_Event_Manager.Models
{
    public class EventDto
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Location { get; set; }
        public DateTime Date { get; set; }
        public string? Attendance { get; set; }
    }
}
