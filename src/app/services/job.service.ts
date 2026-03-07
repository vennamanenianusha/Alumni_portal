import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})

export class JobService {

  constructor(private http:HttpClient){}

  getJobs(){

    return this.http.get('http://localhost:5000/jobs')

  }

}