import { Component, Input } from '@angular/core';
import { IEvent } from '../../interfaces/event';
import { EventsListItemComponent } from '../events-list-item/events-list-item.component';

@Component({
  selector: 'app-events-list',
  standalone: true,
  imports: [EventsListItemComponent],
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.scss'
})
export class EventsListComponent {
  @Input() events: IEvent[] = [];
}
