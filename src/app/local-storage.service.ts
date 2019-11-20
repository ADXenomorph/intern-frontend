import { Injectable } from '@angular/core';
import {AuthResponse} from './models/auth-response';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  saveAuth(auth: AuthResponse) {
    localStorage.setItem('roowix-okr-auth', JSON.stringify(auth));
  }

  private getAuth(): AuthResponse|null {
    return JSON.parse(localStorage.getItem('roowix-okr-auth'));
  }

  getAuthToken(): string|null {
    return this.getAuth() ? this.getAuth().token : null;
  }

  getAuthUserId(): number|null {
    return this.getAuth() ? this.getAuth().user_id : null;
  }
}
