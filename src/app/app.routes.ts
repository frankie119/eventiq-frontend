import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Events } from './components/events/events';
import { AddEvent } from './components/add-event/add-event';
import { Login } from './components/login/login';
import { EventDetails } from './event-details/event-details';
import { RegisterComponent } from './components/register/register';
import { authGuard } from './components/guards/auth-guard';

export const routes: Routes = [
    {
        path: '',
        component: Home
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'events',
        component: Events
    },
    {
        path: 'add-event',
        component: AddEvent,
        canActivate: [authGuard]
    },
    {
        path: 'events/:id',
        component: EventDetails
    },
    {
        path: 'register',
        component: RegisterComponent
    }
   

];
