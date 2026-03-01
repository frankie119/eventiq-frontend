import { Component, OnInit } from '@angular/core';
import { WebService } from '../../services/web-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Authbutton } from '../authbutton/authbutton';
import { Authuser } from '../authuser/authuser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, Authbutton, Authuser],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  trending_events: any = [];

  constructor(private webService: WebService) {}

  ngOnInit() {
  
    this.webService.getTrendingEvents().subscribe((data: any) => {
      this.trending_events = data;
    });
  }
}