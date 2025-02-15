using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Church_Event_Manager.Models;
using Microsoft.AspNetCore.Authorization;

namespace Church_Event_Manager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventModelsController : ControllerBase
    {
        private readonly EventDBcontext _context;

        public EventModelsController(EventDBcontext context)
        {
            _context = context;
        }

        // GET: api/EventModels
        [HttpGet, Authorize(Roles = "Admin, congregant")]
        public async Task<ActionResult<IEnumerable<EventModel>>> Getevents()
        {
            var events = await _context.events.ToListAsync();

            if (events.Count == 0) 
            { 
                return NotFound("Sorry, no events are listed :(");
            }

            return Ok(events);
        }

        // GET: api/EventModels/5
        [HttpGet("{id}"), Authorize(Roles ="Admin")]
        public async Task<ActionResult<EventModel>> GetEventModel(int id)
        {
            var eventModel = await _context.events.FindAsync(id);

            if (eventModel == null)
            {
                return NotFound("Sorry, no events with this Id are available :(");
            }

            return eventModel;
        }

        // PUT: api/EventModels/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> PutEventModel(int id, [FromBody] EventDto updatedEvent)
        {
            var eventModel = await _context.events.FindAsync(id);

            if (eventModel == null) 
            {
                return NotFound("Sorry, no events are available :(");
            }

            eventModel.Title = updatedEvent.Title;
            eventModel.Description = updatedEvent.Description;
            eventModel.Location = updatedEvent.Location;
            eventModel.Date = updatedEvent.Date;

            await _context.SaveChangesAsync();

            return Ok(eventModel);
            
        }

        // POST: api/EventModels
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost, Authorize(Roles = "Admin")]
        public async Task<ActionResult<EventModel>> PostEventModel([FromBody] EventDto request)
        {
            Console.WriteLine($"Received event: {request.Title}, {request.Description}, {request.Location}, {request.Date}");
            var eventModel = new EventModel 
            { 
                Title = request.Title,
                Description = request.Description,
                Location = request.Location,
                Date = request.Date
            };

            _context.events.Add(eventModel);
            await _context.SaveChangesAsync();

            return Ok(eventModel);
        }

        // DELETE: api/EventModels/5
        [HttpDelete("{id}"), Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteEventModel(int id)
        {
            var eventModel = await _context.events.FindAsync(id);

            if (eventModel == null)
            {
                return NotFound("Event with this Id has been deleted :(");
            }

            _context.events.Remove(eventModel);
            await _context.SaveChangesAsync();

            return Ok(await _context.events.ToListAsync());
        }

        private bool EventModelExists(int id)
        {
            return _context.events.Any(e => e.Id == id);
        }
    }
}
