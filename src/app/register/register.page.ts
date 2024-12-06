import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { ToastController, ActionSheetController } from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: string = '';
  password: string = '';
  profileImage: string = '';

  constructor(
    private router: Router,
    private storage: Storage,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController
  ) {
    this.initializeStorage();
  }

  async initializeStorage() {
    await this.storage.create();
  }

  async register() {
    const user = await this.storage.get(this.email);
    if (user) {
      this.showToast('El usuario ya existe.');
    } else {
      await this.storage.set(this.email, { password: this.password, profileImage: this.profileImage });
      this.showToast('Cuenta creada con éxito.');
      this.router.navigate(['/login']);
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Seleccionar Imagen de Perfil',
      buttons: [{
        text: 'Tomar Foto',
        icon: 'camera',
        handler: () => {
          this.takePicture();
        }
      }, {
        text: 'Elegir de la Galería',
        icon: 'images',
        handler: () => {
          this.chooseFromGallery();
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera // Asegúrate de que se usa CameraSource.Camera
    });

    this.profileImage = image.dataUrl ?? ''; // Verificación de null o undefined
  }

  async chooseFromGallery() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Photos // Asegúrate de que se usa CameraSource.Photos
    });

    this.profileImage = image.dataUrl ?? ''; // Verificación de null o undefined
  }
}
