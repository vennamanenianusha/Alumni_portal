import { Component, OnInit } from '@angular/core';
import { JobService } from '../services/job.service';
// import { createClient } from '@supabase/supabase-js'

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  jobs:any[] = []

  searchText = ''
  selectedLocation = ''
  selectedCompany = ''
  
  locations:string[] = []
  companies:string[] = []


  constructor(private jobService:JobService){}

  ngOnInit(){
    this.jobService.getJobs().subscribe((data:any)=>{
   // this.jobs = data

   // this.locations = [...new Set(data.map((j:any)=> j.location))] as string[]

  //  this.companies = [...new Set(data.map((j:any)=> j.company))] as string[]

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
    this.locations = [...new Set(this.jobs.map(j => j.location))]
     // this.locations = [...new Set(data.map((j:any)=> j.location))] as string[]
  })

  // ===== Supabase Integration (Enable Later) =====

  /*
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })

  this.jobs = data || []

  this.locations = [...new Set(this.jobs.map(j => j.location))]
  this.companies = [...new Set(this.jobs.map(j => j.company))]
  */
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
}
