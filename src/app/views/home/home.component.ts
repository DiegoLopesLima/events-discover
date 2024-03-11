import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsListComponent } from '../../components/events-list/events-list.component';
import { IEvent } from '../../interfaces/event';
import { Subscription } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { ContainerComponent } from '../../components/container/container.component';
import { SectionHeadingComponent } from '../../components/section-heading/section-heading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [EventsListComponent, ContainerComponent, SectionHeadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  events: IEvent[] = [];
  private subscriptions = new Subscription();

  constructor(private eventsService: EventsService) {}

  ngOnInit() {
    const eventsSubscription = this.eventsService.retrieveEvents()
      .subscribe((events) => {
        console.log("events", events);

        this.events = events;
      });

    this.subscriptions.add(eventsSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
