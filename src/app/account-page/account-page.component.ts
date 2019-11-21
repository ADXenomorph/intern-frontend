import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../local-storage.service';

@Component({
  selector: 'app-account-page',
  templateUrl: './account-page.component.html',
  styleUrls: ['./account-page.component.scss']
})
export class AccountPageComponent implements OnInit {
  currentPassword: string;
  newPassword: string;
  error: string | null = null;

  constructor(
    private api: ApiService,
    private router: Router,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
  }

  changePassword() {
    this.error = null;

    this.api.changePassword(this.currentPassword, this.newPassword)
      .subscribe(
        success => {
          this.localStorage.deleteAuth();
          this.router.navigate(['/auth']);
        },
        () => {
          this.error = 'Invalid password';
        },
      );
  }
}
