import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.page.html',
  styleUrls: ['./password-recovery.page.scss'],
})
export class PasswordRecoveryPage {
  email: string = '';
  newPassword: string = '';

  constructor(
    private router: Router,
    private storage: Storage,
    private toastController: ToastController
  ) {}

  async recoverPassword() {
    const user = await this.storage.get(this.email);
    if (user) {
      user.password = this.newPassword;
      await this.storage.set(this.email, user);
      this.showToast('Contraseña actualizada con éxito.');
      this.router.navigate(['/login']);
    } else {
      this.showToast('Usuario no encontrado.');
    }
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

