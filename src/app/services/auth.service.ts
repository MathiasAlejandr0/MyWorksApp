import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // Inicializa el almacenamiento
    this._storage = await this.storage.create();
  }

  async login(email: string, password: string): Promise<boolean> {
    if (this._storage) {
      const storedEmail = await this._storage.get('email');
      const storedPassword = await this._storage.get('password');
      return email === storedEmail && password === storedPassword;
    }
    return false;
  }

  async register(email: string, password: string): Promise<void> {
    if (this._storage) {
      await this._storage.set('email', email);
      await this._storage.set('password', password);
    }
  }
}

