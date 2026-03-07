import { Component, OnInit } from '@angular/core'
// import { createClient } from '@supabase/supabase-js'

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  events:any[] = []

  ngOnInit(){

    // ===== Dummy Events (temporary) =====

    this.events = [

      {
        day:"12",
        month:"Oct",
        title:"Annual Alumni Meet",
        location:"University Auditorium",
        description:"Reconnect with classmates and celebrate alumni achievements.",
        organizer:"Rahul Sharma",
        button:"Register"
      },

      {
        day:"25",
        month:"Nov",
        title:"Career Networking Night",
        location:"Virtual Event",
        description:"Connect with alumni leaders across industries.",
        organizer:"Ananya Gupta",
        button:"Join Event"
      },

      {
        day:"10",
        month:"Dec",
        title:"Startup Founder Meetup",
        location:"Innovation Hub",
        description:"Meet alumni founders and discuss startup journeys.",
        organizer:"Karan Mehta",
        button:"Register"
      }

    ]


    // ===== Supabase Integration (Enable Later) =====

    /*
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

    const { data, error } = await supabase
      .from('events')
      .select('*')
      .order('event_date')

    this.events = data.map(event => {

      const date = new Date(event.event_date)

      return {
        day: date.getDate(),
        month: date.toLocaleString('default', { month: 'short' }),
        title: event.title,
        location: event.location,
        description: event.description,
        organizer: event.organized_by,
        button:"Register"
      }

    })
    */

  }

}