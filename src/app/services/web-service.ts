import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  
  private BASE_URL = 'http://localhost:5000/api/v1.0';
  
  constructor(private http: HttpClient) {}

  getEvents(page: number = 1) {
    return this.http.get(`${this.BASE_URL}/events?pn=${page}&ps=3`);
  }

  getTrendingEvents() {
    return this.http.get(`${this.BASE_URL}/events/trending`);
  }

  getOneEvent(id: string) {
    return this.http.get(`${this.BASE_URL}/events/${id}`);
  }

  bookTicket(id: string) {
    return this.http.post(`${this.BASE_URL}/events/${id}/book`, {});
  }
}