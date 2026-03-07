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

    // Create mock map container for Leaflet
    const mapDiv = document.createElement('div');
    mapDiv.id = 'map';
    mapDiv.style.height = '500px';

    document.body.appendChild(mapDiv);

    fixture.detectChanges();

  });

  afterEach(() => {

    // Cleanup map element after test
    const mapDiv = document.getElementById('map');
    if (mapDiv) {
      mapDiv.remove();
    }

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have places defined', () => {
    expect(component.places).toBeDefined();
    expect(Object.keys(component.places).length).toBeGreaterThan(0);
  });

});