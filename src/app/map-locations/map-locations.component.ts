import { Component } from '@angular/core';
import * as L from 'leaflet';
import { SupabaseService } from '../services/supabase.service';
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/leaflet/marker-icon-2x.png',
  iconUrl: 'assets/leaflet/marker-icon.png',
  shadowUrl: 'assets/leaflet/marker-shadow.png'
});
@Component({
  selector: 'app-map-locations',
  templateUrl: './map-locations.component.html',
  styleUrls: ['./map-locations.component.css']
})

export class MapLocationsComponent {

  map:any;

  // Dummy alumni locations (for now)

  places:any = {

    "Rahul Sharma": [12.9716,77.5946],   // Bangalore
    "Ananya Gupta": [17.3850,78.4867],   // Hyderabad
    "Karan Mehta": [19.0760,72.8777],    // Mumbai
    "Priya Iyer": [47.6062,-122.3321]    // Seattle

  };



  constructor(private supabaseService: SupabaseService){}

  async showMap(){

    if(this.map){
      return;
    }

    this.map = L.map('map').setView([20,0],2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution:'© OpenStreetMap'
    }).addTo(this.map);



    // ===== Supabase Data =====
    try{
      const supabase = this.supabaseService.getClient()
      const { data, error } = await supabase
        .from('alumni')
        .select('name, latitude, longitude')

      if(error){
        throw error
      }

      (data || []).forEach((alum: any) => {
        if(alum.latitude && alum.longitude){
          L.marker([alum.latitude, alum.longitude])
            .addTo(this.map)
            .bindPopup(`<b>${alum.name}</b>`)
        }
      })
      return
    }catch(err){
      // fallback to dummy data
    }

    // Add markers from places object (fallback)
    Object.keys(this.places).forEach(name => {
      const coords = this.places[name];
      L.marker(coords)
        .addTo(this.map)
        .bindPopup(`<b>${name}</b>`);
    });

  }

}
