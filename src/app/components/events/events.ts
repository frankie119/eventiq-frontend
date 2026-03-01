import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EventData } from '../../services/event-data';
import { WebService } from '../../services/web-service';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth-service';

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
  isAdmin: boolean = false;
  recommendations: any[] = [];

  constructor(private webService: WebService,
              private authService: AuthService
  ) {}

  ngOnInit() {
    this.loadEvents(this.currentPage);
    this.isAdmin = this.authService.isAdmin();

    const userInterests = this.authService.getUserInterests();
    console.log("STEP 1: Interests pulled from login token ->", userInterests);

    if (userInterests && userInterests.length > 0) {
      console.log("STEP 2: Calling Flask ML Engine with interests...");
      this.webService.recommendEvents(userInterests).subscribe({
        next: (data: any) => {
          console.log("STEP 3: Flask returned these recommendations ->", data);
          this.recommendations = data;
        },
        error: (err) => {
          console.error("STEP 3 ERROR: Flask call failed ->", err);
        }
      });
    } else {
      console.log("STEP 2: Skipped. User has no interests saved in their token.");
    }
  }

  onDelete(id: string) {
if (confirm("Are you sure you want to delete this event?")) {
  this.webService.deleteEvent(id).subscribe({
    next: () => {
      this.event_list = this.event_list.filter((event: any) => event.id !== id);
      console.log('Event deleted sucessfully');
    },
    error: (err) => {
      console.error("Event failed to be deleted (try again)", err);
      alert("You do not have permission to delete this event!");
    }
  });
}

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
