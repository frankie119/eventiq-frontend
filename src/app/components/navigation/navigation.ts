import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterModule,],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',

})
export class Navigation {
  document = document;
  constructor(public authService: AuthService) {}

  doLogout() {
    this.authService.logout();
  }

}
