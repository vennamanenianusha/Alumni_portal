import { Component, OnInit } from '@angular/core'
import { SupabaseService } from '../services/supabase.service'

@Component({
  selector: 'app-alumni',
  templateUrl: './alumni.component.html',
  styleUrls: ['./alumni.component.css']
})
export class AlumniComponent implements OnInit {

  alumni:any[] = []

  searchText = ''
  selectedBatch = ''
  selectedCompany = ''

  batches:string[] = []
  companies:string[] = []

  constructor(private supabaseService: SupabaseService){}

  async ngOnInit(){

    // ===== Supabase Data =====
    try{
      const supabase = this.supabaseService.getClient()
      const { data, error } = await supabase
        .from('alumni')
        .select('*')

      if(error){
        throw error
      }

      this.alumni = data || []
    }catch(err){
      // ===== Dummy Data (fallback) =====

      this.alumni = [

      {
        name:"Rahul Sharma",
        role:"Data Scientist",
        company:"Google",
        batch:"2022",
        location:"Bangalore"
      },

      {
        name:"Ananya Gupta",
        role:"ML Engineer",
        company:"Amazon",
        batch:"2023",
        location:"Hyderabad"
      },

      {
        name:"Karan Mehta",
        role:"Data Analyst",
        company:"Deloitte",
        batch:"2022",
        location:"Mumbai"
      },

      {
        name:"Priya Iyer",
        role:"AI Researcher",
        company:"Microsoft",
        batch:"2021",
        location:"Seattle"
      }

      ]
    }

    this.batches = [...new Set(this.alumni.map(a => a.batch))]

    this.companies = [...new Set(this.alumni.map(a => a.company))]



    this.batches = [...new Set(this.alumni.map(a => a.batch))]
    this.companies = [...new Set(this.alumni.map(a => a.company))]

  }

  filteredAlumni(){

    return this.alumni.filter(alum =>

      (alum.name.toLowerCase().includes(this.searchText.toLowerCase()) ||

      alum.company.toLowerCase().includes(this.searchText.toLowerCase()))

      &&

      (this.selectedBatch === '' || alum.batch === this.selectedBatch)

      &&

      (this.selectedCompany === '' || alum.company === this.selectedCompany)

    )

  }

  clearFilters(){

    this.searchText = ''
    this.selectedBatch = ''
    this.selectedCompany = ''

  }

}
