import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private storage: Storage,
    private toastController: ToastController
  ) {
    this.initializeStorage();
  }

  async initializeStorage() {
    await this.storage.create();
  }

  async login() {
    const user = await this.storage.get(this.email);
    if (user && user.password === this.password) {
      this.showToast('Inicio de sesión exitoso.');
      this.router.navigate(['/dashboard']);
    } else {
      this.showToast('Correo o contraseña incorrectos.');
    }
  }

  navigateToRecovery() {
    this.router.navigate(['/password-recovery']);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
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
