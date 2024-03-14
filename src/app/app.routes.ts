import { Routes } from '@angular/router';
import { HomeViewComponent } from './views/home/home.component';
import { EventViewComponent } from './views/event/event.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeViewComponent,
  },
  {
    path: 'events/:id',
    component: EventViewComponent,
  },
];
