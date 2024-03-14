import { Component, OnDestroy, OnInit } from '@angular/core';
import { IEvent } from '../../interfaces/event';
import { AsyncPipe, DatePipe } from '@angular/common';
import { GetEventCoverImagePipe } from '../../pipes/get-event-cover-image.pipe';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { EventsService } from '../../services/events.service';
import { ContainerComponent } from '../../components/container/container.component';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [DatePipe, GetEventCoverImagePipe, AsyncPipe, ContainerComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventViewComponent implements OnInit, OnDestroy {
  event$ = new Observable<IEvent>();
  private subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventsService: EventsService,
  ) {}

  ngOnInit() {
    this.subscribeParams();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  subscribeParams() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.event$ = this.eventsService.getEventById(id);
    });
  }
}
