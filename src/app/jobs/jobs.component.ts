import { Component, OnInit } from '@angular/core';
import { SupabaseService } from '../services/supabase.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs:any[] = []
  selectedJob:any = null
  showApplyModal = false
  submitting = false
  submitMessage = ''
  applyForm = {
    name: '',
    email: '',
    phone: '',
    resumeUrl: '',
    coverNote: ''
  }

  searchText = ''
  selectedLocation = ''
  selectedCompany = ''
  
  locations:string[] = []
  companies:string[] = []


  constructor(private supabaseService:SupabaseService){}

  async ngOnInit(){
    // ===== Supabase Data =====
    try{
      const supabase = this.supabaseService.getClient()
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })

      if(error){
        throw error
      }

      this.jobs = data || []
    }catch(err){
      // ===== Dummy Data (fallback) =====
      this.jobs = [
        {
          title:"Data Scientist",
          company:"Google",
          location:"Bangalore",
          description:"Work on ML models",
          postedBy:"Rahul Sharma"
        },
        {
          title:"ML Engineer",
          company:"Amazon",
          location:"Hyderabad",
          description:"Build ML pipelines",
          postedBy:"Ananya Gupta"
        }
      ]
    }

    this.locations = [...new Set(this.jobs.map(j => j.location))]
    this.companies = [...new Set(this.jobs.map(j => j.company))]
  }

  filteredJobs(){

    return this.jobs.filter(job =>
    
    (job.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
     job.company.toLowerCase().includes(this.searchText.toLowerCase()))
    
    &&
    
    (this.selectedLocation === '' || job.location === this.selectedLocation)
    
    &&
    
    (this.selectedCompany === '' || job.company === this.selectedCompany)
    
    )
    
    }
    clearFilters(){

      this.searchText = ''
      this.selectedLocation = ''
      this.selectedCompany = ''
      
      }

  openApply(job:any){
    this.selectedJob = job
    this.showApplyModal = true
    this.submitMessage = ''
  }

  closeApply(){
    this.showApplyModal = false
    this.selectedJob = null
    this.submitting = false
    this.applyForm = {
      name: '',
      email: '',
      phone: '',
      resumeUrl: '',
      coverNote: ''
    }
  }

  async submitApplication(){
    if(!this.selectedJob){
      return
    }
    this.submitting = true
    this.submitMessage = ''

    try{
      const supabase = this.supabaseService.getClient()
      const { error } = await supabase
        .from('job_applications')
        .insert({
          job_id: this.selectedJob.id || null,
          job_title: this.selectedJob.title,
          company: this.selectedJob.company,
          posted_by: this.selectedJob.postedBy || this.selectedJob.posted_by || null,
          applicant_name: this.applyForm.name,
          applicant_email: this.applyForm.email,
          applicant_phone: this.applyForm.phone,
          resume_url: this.applyForm.resumeUrl,
          cover_note: this.applyForm.coverNote
        })

      if(error){
        throw error
      }

      this.submitMessage = 'Application submitted successfully.'
      this.submitting = false
      return
    }catch(err){
      this.submitMessage = 'Failed to submit. Please try again.'
      this.submitting = false
    }
  }
}
