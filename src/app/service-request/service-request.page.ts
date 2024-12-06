import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.page.html',
  styleUrls: ['./service-request.page.scss'],
})
export class ServiceRequestPage implements OnInit {
  professionals: any[] = [];
  service?: string;
  map!: mapboxgl.Map;
  selectedProfessional: any = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.initializeStorage();
  }

  async initializeStorage() {
    await this.storage.create();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.service = params['service'];
      this.loadProfessionals();
    });
  }

  loadProfessionals() {
    const services = [
      { name: 'Maestro Constructor', professionals: [
        { name: 'Juan Pérez', description: 'Experto en construcción', distance: '2 km', location: [-72.9411, -41.4691], image: 'assets/images/perfil.jpg', gallery: ['assets/images/trabajo1.jpg', 'assets/images/trabajo2.jpg'] },
        { name: 'Carlos López', description: 'Especialista en reformas', distance: '3 km', location: [-72.9415, -41.4695], image: 'assets/images/perfil.jpg', gallery: ['assets/images/trabajo3.jpg', 'assets/images/trabajo4.jpg'] },
        { name: 'Pedro González', description: 'Profesional en albañilería', distance: '1.5 km', location: [-72.9420, -41.4700], image: 'assets/images/perfil.jpg', gallery: ['assets/images/trabajo5.jpg', 'assets/images/trabajo6.jpg'] },
      ]},
      { name: 'Gasfiter', professionals: [
        { name: 'María López', description: 'Especialista en gasfitería', distance: '2 km', location: [-72.9411, -41.4691], image: 'assets/images/perfil.jpg', gallery: ['assets/images/trabajo7.jpg', 'assets/images/trabajo8.jpg'] },
        { name: 'Ana García', description: 'Experta en instalaciones de gas', distance: '3 km', location: [-72.9415, -41.4695], image: 'assets/images/perfil.jpg', gallery: ['assets/images/trabajo9.jpg', 'assets/images/trabajo10.jpg'] },
        { name: 'Luis Martínez', description: 'Profesional en reparaciones de gas', distance: '1.5 km', location: [-72.9420, -41.4700], image: 'assets/images/perfil.jpg', gallery: ['assets/images/trabajo11.jpg', 'assets/images/trabajo12.jpg'] },
      ]},
      { name: 'Cerrajero', professionals: [
        { name: 'José Ramírez', description: 'Especialista en cerrajería', distance: '2 km', location: [-72.9411, -41.4691], image: 'assets/images/perfil.jpg', gallery: ['assets/images/trabajo13.jpg', 'assets/images/trabajo14.jpg'] },
        { name: 'Miguel Torres', description: 'Experto en cerraduras', distance: '3 km', location: [-72.9415, -41.4695], image: 'assets/images/perfil.jpg', gallery: ['assets/images/trabajo15.jpg', 'assets/images/trabajo16.jpg'] },
        { name: 'Laura Fernández', description: 'Profesional en seguridad', distance: '1.5 km', location: [-72.9420, -41.4700], image: 'assets/images/perfil.jpg', gallery: ['assets/images/trabajo17.jpg', 'assets/images/trabajo18.jpg'] },
      ]},
    ];

    const selectedService = services.find(s => s.name === this.service);
    if (selectedService) {
      this.professionals = selectedService.professionals;
      this.initializeMap();
    }
  }

  initializeMap() {
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoiaW1hdGhpYXM5MSIsImEiOiJjbTM4YWx6eW4wbnNvMmxwczQydjRyZjBnIn0.u-z3d5OoTZENri1RGPbYJg';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-72.9420, -41.4700], // Centro inicial del mapa
      zoom: 14
    });

    this.map.on('load', () => {
      this.addMarkers();
    });
  }

  addMarkers() {
    this.professionals.forEach(professional => {
      const marker = new mapboxgl.Marker()
        .setLngLat(professional.location)
        .addTo(this.map);

      marker.getElement().addEventListener('click', () => {
        this.selectProfessional(professional);
      });
    });
  }

  selectProfessional(professional: any) {
    this.selectedProfessional = professional;
    const detailsElement = document.querySelector('.professional-details');
    if (detailsElement) {
      detailsElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  async requestService(professional: any) {
    await this.addOrderToHistory(professional);
    this.showToast(`Servicio solicitado a ${professional.name}`);
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 3000);
  }

  async addOrderToHistory(professional: any) {
    const orders = (await this.storage.get('orders')) || [];
    const newOrder = {
      service: this.service,
      professional: professional,
      date: new Date(),
      status: 'Solicitado'
    };
    orders.push(newOrder);
    await this.storage.set('orders', orders);
  }

  goBack() {
    this.selectedProfessional = null;
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
