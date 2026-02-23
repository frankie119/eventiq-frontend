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
    // Fetch top 5 trending events from Flask
    // Ensure your WebService has a getTrendingEvents() method!
    // If not, use: this.http.get('http://127.0.0.1:5000/api/v1.0/events/trending')
    this.webService.getTrendingEvents().subscribe((data: any) => {
      this.trending_events = data;
    });
  }
}