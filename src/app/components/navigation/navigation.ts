import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',

})
export class Navigation {
  document = document;
  constructor(public authService: AuthService, private router: Router) {}
  

  doLogout() {
    this.authService.logout();
  }

}
