import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapLocationsComponent } from './map-locations.component';

describe('MapLocationsComponent', () => {
  let component: MapLocationsComponent;
  let fixture: ComponentFixture<MapLocationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapLocationsComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapLocationsComponent);
    component = fixture.componentInstance;

    // Mock map container for Leaflet
    const mapDiv = document.createElement('div');
    mapDiv.setAttribute('id', 'map');
    document.body.appendChild(mapDiv);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have places defined', () => {
    expect(Object.keys(component.places).length).toBeGreaterThan(0);
  });
});
