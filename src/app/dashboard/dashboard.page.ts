import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  services = [
    { name: 'Maestro Constructor', description: 'Servicio de construcción', icon: 'assets/images/perfil.jpg' },
    { name: 'Gasfiter', description: 'Servicio de gasfitería', icon: 'assets/images/perfil.jpg' },
    { name: 'Cerrajero', description: 'Servicio de cerrajería', icon: 'assets/images/perfil.jpg' },
  ];

  orders: Order[] = [];
  userName: string = '';
  profileImage: string = '';

  constructor(
    private router: Router,
    private storage: Storage,
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    this.loadUserProfile();
    await this.loadOrders();
  }

  async loadUserProfile() {
    const user = await this.storage.get('userProfile');
    if (user) {
      this.userName = user.name;
      this.profileImage = user.profileImage;
    }
  }

  async loadOrders() {
    this.orders = (await this.storage.get('orders')) || [];
  }

  navigateToServiceRequest(service: string) {
    this.router.navigate(['/service-request'], { queryParams: { service } });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async clearOrders() {
    await this.storage.remove('orders');
    this.orders = [];
    this.showToast('Historial de pedidos borrado.');
  }

  async logout() {
    await this.storage.clear();
    this.router.navigate(['/login']);
    this.showToast('Sesión cerrada.');
  }
}
