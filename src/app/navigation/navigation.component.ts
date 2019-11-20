import { Component } from '@angular/core';
import {LocalStorageService} from '../local-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  constructor(
    private localStorage: LocalStorageService,
    private router: Router
  ) {}

  logout() {
    this.localStorage.deleteAuth();
    this.router.navigate(['/auth']);
  }
}
