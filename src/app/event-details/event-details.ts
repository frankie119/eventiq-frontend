import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WebService } from '../services/web-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails implements OnInit {
  event_data: any;

  bookingMessage: string = '';
  isError: boolean = false;

  constructor(private route: ActivatedRoute, private webService: WebService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.webService.getOneEvent(id).subscribe((response: any) => {
        this.event_data = response;
        console.log("Loaded event:", this.event_data);
      });
    }
  }

  bookTicket() {
    console.log("Button was clicked! Sending request to Flask");
    if (this.event_data && this.event_data._id) {
      this.webService.bookTicket(this.event_data._id).subscribe({
        next: (response: any) => {
          this.isError = false;
          this.bookingMessage = response.message;

          if (this.event_data.tickets_left > 0) {
            this.event_data.tickets_left--;
          }
          setTimeout(() => {
            this.bookingMessage = '';
          }, 3000);
        },
        error: (err) => {
          this.isError = true;
          this.bookingMessage = err.error.error || "Something went wrong";
          setTimeout(() => {
            this.bookingMessage = '';
          }, 3000);
        }
      });
    }
  }

}
