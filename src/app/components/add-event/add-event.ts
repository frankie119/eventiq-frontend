import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { WebService } from '../../services/web-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-event',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-event.html',
  styleUrl: './add-event.css',
})
export class AddEvent {

  public eventForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private webService: WebService, public router: Router) {
    this.eventForm = formBuilder.group({
      title:['', Validators.required],
      category:['', Validators.required],
      venue: ['', Validators.required],
      date: ['', Validators.required],
      price: [0, Validators.required],
      total_tickets: [0, Validators.required],
      event_image: [null]
    });
  }

  onFileSelect(event: any) {
    if (event?.target.files.length > 0) {
      const file = event?.target.files[0];

      this.eventForm.patchValue({
        event_image: file
      })
    }
  }
  onSubmit() {
    if (this.eventForm.valid) {
      const formData = new FormData();

      formData.append('title', this.eventForm.get('title')?.value);
      formData.append('category', this.eventForm.get('category')?.value);
      formData.append('venue', this.eventForm.get('venue')?.value);
      formData.append('date', this.eventForm.get('date')?.value);
      formData.append('price', this.eventForm.get('price')?.value);
      formData.append('total_tickets', this.eventForm.get('total_tickets')?.value);

      const file = this.eventForm.get('event_image')?.value;
      if (file) {
        formData.append('event_image', file);
      }

      this.webService.postEvent(formData).subscribe((res) =>
      { this.router.navigate(['/events']);

      });

    } else {
      console.log("Please fill in all required fields")
    }
  }
}
