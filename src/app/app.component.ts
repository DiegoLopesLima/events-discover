import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { EventsService } from './services/events.service';
import { Subscription } from 'rxjs';
import { IEvent } from './interfaces/event';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  appName = 'Events Discover';
  currentFullYear = new Date().getFullYear();
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
