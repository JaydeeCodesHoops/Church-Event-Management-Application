namespace Church_Event_Manager.Models
{
    public class UserDto
    {
        public required string? Email { get; set; }
        public required string Password { get; set; }
        public string? Name { get; set; }
        public string? Role { get; set; } 
    }
}
