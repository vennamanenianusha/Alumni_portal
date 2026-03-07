import { Component, OnInit } from '@angular/core'
// import { createClient } from '@supabase/supabase-js'

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

  ngOnInit(){

    // ===== Dummy Data (for now) =====

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

    this.batches = [...new Set(this.alumni.map(a => a.batch))]

    this.companies = [...new Set(this.alumni.map(a => a.company))]



    // ===== Supabase Integration (Uncomment later) =====

    /*
    const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

    const { data, error } = await supabase
      .from('alumni')
      .select('*')

    this.alumni = data

    this.batches = [...new Set(data.map(a => a.batch))]
    this.companies = [...new Set(data.map(a => a.company))]
    */

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
