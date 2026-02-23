import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventData } from '../../services/event-data';
import { WebService } from '../../services/web-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-events',
  imports: [CommonModule, RouterModule],
  providers: [EventData],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {
  event_list: any = [];
  constructor(private webService: WebService ) {}

  ngOnInit() {
    // Subscribe to the Observable
    this.webService.getEvents().subscribe((response: any) => {
      this.event_list = response;
      console.log('Got data from Flask:', this.event_list);
    });
  }
}
