import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  // The Backend flask url
  private BASE_URL = 'http://127.0.0.1:5000/api/v1.0';
  
  constructor(private http: HttpClient) {}
  getEvents() {
    return this.http.get(this.BASE_URL + '/events');
  }

  getTrendingEvents() {
    return this.http.get(this.BASE_URL +'/events/trending');
  }

  getOneEvent(id: string) {
    return this.http.get(this.BASE_URL + '/events/' + id);
  }
}
