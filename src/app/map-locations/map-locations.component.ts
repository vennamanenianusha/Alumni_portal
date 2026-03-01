import { Component } from '@angular/core';
import * as L from 'leaflet';

// Fix Leaflet marker icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'assets/male-icon.png',
  iconUrl: 'assets/male-icon.png',
  shadowUrl: 'assets/male-icon.png'
});

@Component({
  selector: 'app-map-locations',
  templateUrl: './map-locations.component.html',
  styleUrls: ['./map-locations.component.css']
})
export class MapLocationsComponent {

  map: L.Map | undefined;

  // Your dictionary
  places: { [key: string]: string } = {
    Anu: 'Google, Hyderabad',
    Ravi: 'Bangalore',
    Maddy: 'Chennai',
    Tammy: 'Mumbai', 
  };

  showMap(): void {
    const mapElement = document.getElementById('map');
    if (!mapElement) {
      return; // prevents test crash
    }

    if (!this.map) {
      this.map = L.map('map').setView([20.5937, 78.9629], 5);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap'
      }).addTo(this.map);
    }

    Object.keys(this.places).forEach(name => {
      this.addMarker(this.places[name], name);
    });
  }

  addMarker(place: string, label: string): void {
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`)
      .then(res => res.json())
      .then(data => {
        if (data.length && this.map) {
          L.marker([+data[0].lat, +data[0].lon])
            .addTo(this.map)
            .bindPopup(`${label} - ${place}`);
        }
      });
  }
}
