import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  placements: any[] = [];
  currentImage = 0;
  chatbotUrl: SafeResourceUrl;

  constructor(
    private sanitizer: DomSanitizer,
    private http: HttpClient,
    private supabaseService: SupabaseService
  ) {
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
    this.loadSupabaseData();
  }

  async loadSupabaseData(){
    try{
      const supabase = this.supabaseService.getClient()

      const { data: placementsData, error: placementsError } = await supabase
        .from('placements')
        .select('*')

      if(placementsError){
        throw placementsError
      }

      this.placements = placementsData || []

      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .order('event_date')

      if(eventsError){
        throw eventsError
      }

      this.events = (eventsData || []).map((e: any) => ({
        title: e.title,
        desc: e.description
      }))

      const { data: newsData, error: newsError } = await supabase
        .from('news')
        .select('*')
        .order('published_at', { ascending: false })

      if(newsError){
        throw newsError
      }

      this.newsList = (newsData || []).map((n: any) => ({
        title: n.title,
        desc: n.summary
      }))

      const { data: careersData, error: careersError } = await supabase
        .from('careers')
        .select('*')
        .order('created_at', { ascending: false })

      if(careersError){
        throw careersError
      }

      this.careers = (careersData || []).map((c: any) => ({
        title: c.title,
        company: c.company
      }))
      return
    }catch(err){
      // fallback to existing local endpoint for placements
      this.http.get<any[]>('http://localhost:3000/api/admin/placements')
        .subscribe({
          next: (data) => this.placements = data,
          error: () => console.log('Failed to load placements')
        });
    }
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
