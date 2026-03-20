import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
// import { createClient } from '@supabase/supabase-js'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  placements: any[] = [];
  currentImage = 0;
  chatbotUrl: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer,private http: HttpClient) {
    // Dialogflow chatbot URL
    this.chatbotUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://console.dialogflow.com/api-client/demo/embedded/b7657c94-a898-4932-8b63-22710806f493'
    );
    
  }

  // Slider images
  images = [
    'assets/slide2.jpg',
    'assets/slide3.jpg',
    'assets/slide4.jpg'
  ];

  events = [
    { title: 'Alumni Meet 2026', desc: 'Reconnect with alumni.' },
    { title: 'Tech Talk', desc: 'AI Industry session.' }
  ];

  newsList = [
    { title: 'Startup Success', desc: 'Alumni launched startup.' },
    { title: 'Campus Placement', desc: 'Students placed in MNC.' }
  ];

  careers = [
    { title: 'Software Engineer', company: 'Infosys' },
    { title: 'Frontend Developer', company: 'TCS' }
  ];

  ngOnInit() {
    setInterval(() => {
      this.currentImage =
        (this.currentImage + 1) % this.images.length;
    }, 5000);
    this.loadPlacements();

    // ===== Supabase Integration (Enable Later) =====

    /*
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

    const { data: placementsData } = await supabase
      .from('placements')
      .select('*')

    this.placements = placementsData || []

    const { data: eventsData } = await supabase
      .from('student_events')
      .select('*')
      .order('event_date')

    this.events = (eventsData || []).map(e => ({
      title: e.title,
      desc: e.description
    }))

    const { data: newsData } = await supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false })

    this.newsList = (newsData || []).map(n => ({
      title: n.title,
      desc: n.summary
    }))

    const { data: careersData } = await supabase
      .from('careers')
      .select('*')
      .order('created_at', { ascending: false })

    this.careers = (careersData || []).map(c => ({
      title: c.title,
      company: c.company
    }))
    */
  }
  loadPlacements() {
    this.http.get<any[]>('http://localhost:3000/api/admin/placements')
      .subscribe({
        next: (data) => this.placements = data,
        error: () => console.log('Failed to load placements')
      });
  }

  nextSlide() {
    this.currentImage =
      (this.currentImage + 1) % this.images.length;
  }

  prevSlide() {
    this.currentImage =
      (this.currentImage - 1 + this.images.length) % this.images.length;
  }
}
