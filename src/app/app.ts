import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Events } from './components/events/events';
import { Navigation } from './components/navigation/navigation';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Events, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = signal('SmartReccomendationFE');
}
