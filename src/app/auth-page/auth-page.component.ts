import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../local-storage.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {
  email: string;
  password: string;
  error: string | null = null;

  constructor(
    private api: ApiService,
    private router: Router,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
  }

  login() {
    this.error = null;

    this.api.auth(this.email, this.password)
      .subscribe(
        success => {
          this.localStorage.saveAuth(success);
          this.router.navigate(['/progress']);
        },
        () => {
          this.error = 'Invalid credentials';
        },
      );
  }
}
