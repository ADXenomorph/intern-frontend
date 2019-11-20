import { Injectable } from '@angular/core';
import {AuthResponse} from './models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private authKey = 'roowix-okr-auth';

  saveAuth(auth: AuthResponse) {
    localStorage.setItem(this.authKey, JSON.stringify(auth));
  }

  private getAuth(): AuthResponse|null {
    return JSON.parse(localStorage.getItem(this.authKey));
  }

  getAuthToken(): string|null {
    return this.getAuth() ? this.getAuth().token : null;
  }

  getAuthUserId(): number|null {
    return this.getAuth() ? this.getAuth().user_id : null;
  }

  deleteAuth() {
    localStorage.removeItem(this.authKey);
  }
}
