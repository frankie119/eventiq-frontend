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
  // Variables to track pagination
  currentPage: number = 1;
  totalPages: number = 1;

  constructor(private webService: WebService ) {}

  ngOnInit() {
    // Loads the fist page when the user opens the website
    this.loadEvents(this.currentPage);
  }

  loadEvents(page: number) {
    // Subscribe to the Observable
    this.webService.getEvents(page).subscribe((response: any) => {
      this.event_list = response.events;
      this.currentPage = response.current_page;
      this.totalPages = response.total_pages;

      console.log('Sucessfully loaded page ' + this.currentPage + ' of ' + this.totalPages);
    });
  }

  //Helper function for the buttons
  previousPage() {
    if (this.currentPage > 1) {
      this.loadEvents(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.loadEvents(this.currentPage + 1);
    }
  }
}
