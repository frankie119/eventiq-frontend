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

}
