using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer;

namespace Church_Event_Manager.Models
{
    public class EventDBcontext : DbContext
    {
        public EventDBcontext(DbContextOptions<EventDBcontext> options) : base(options) { }
        public DbSet <EventModel> events {  get; set; }
        public DbSet <User> Users { get; set; }
        public DbSet <AttendanceTrack> AttendanceTracks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AttendanceTrack>()
                .HasKey(at => new { at.UserId, at.EventId});

            modelBuilder.Entity<AttendanceTrack>()
                .HasOne(at => at.User)
                .WithMany(e => e.AttendanceTracks)
                .HasForeignKey(at => at.UserId);

            modelBuilder.Entity<AttendanceTrack>()
                .HasOne(at => at.EventModel)
                .WithMany(e => e.AttendanceTracks)
                .HasForeignKey(at => at.EventId);
        }
    }
}
