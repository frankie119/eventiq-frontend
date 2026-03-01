import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebService {
  
  private BASE_URL = 'http://localhost:5000/api/v1.0';
  
  constructor(private http: HttpClient) {}

  getEvents(page: number = 1) {
    return this.http.get(`${this.BASE_URL}/events?pn=${page}&ps=3`);
  }

  postEvent(event: any) {
    let myHeaders = new HttpHeaders();
      myHeaders = myHeaders.set('x-access-token', localStorage.getItem("token") ||'')
      return this.http.post(`${this.BASE_URL}/events`, event,  {headers: myHeaders});
  
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

  deleteEvent(id: string): Observable<any>{
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('x-access-token', token || '');

    return this.http.delete(`${this.BASE_URL}/events/${id}`, { headers });
  }

  recommendEvents(interests: string[]): Observable<any> {
    return this.http.post(`${this.BASE_URL}/events/recommend`, { interests });
  }
}