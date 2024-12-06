import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-mapbox-map',
  templateUrl: './mapbox-map.component.html',
  styleUrls: ['./mapbox-map.component.scss'],
})
export class MapboxMapComponent implements OnInit, AfterViewInit {
  map: mapboxgl.Map;

  constructor() {
    this.map = {} as mapboxgl.Map; // Inicializar con un valor predeterminado vacío
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeMap();
  }

  initializeMap() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiaW1hdGhpYXM5MSIsImEiOiJjbTM4YWx6eW4wbnNvMmxwczQydjRyZjBnIn0.u-z3d5OoTZENri1RGPbYJg'; // Reemplaza con tu clave de acceso
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-74.5, 40], // Coordenadas iniciales [longitud, latitud]
      zoom: 9 // Nivel de zoom inicial
    });

    // Ejemplo de marcador
    new mapboxgl.Marker()
      .setLngLat([-74.5, 40])
      .setPopup(new mapboxgl.Popup().setText('Un lugar interesante'))
      .addTo(this.map);
  }
}
