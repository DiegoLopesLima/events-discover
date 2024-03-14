import { Component, Input } from '@angular/core';
import { IEvent } from '../../interfaces/event';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { GetEventCoverImagePipe } from '../../pipes/get-event-cover-image.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-events-list-item',
  standalone: true,
  imports: [MatCardModule, DatePipe, GetEventCoverImagePipe, RouterLink],
  templateUrl: './events-list-item.component.html',
  styleUrl: './events-list-item.component.scss'
})
export class EventsListItemComponent {
  @Input() event: IEvent = {} as IEvent;
}
