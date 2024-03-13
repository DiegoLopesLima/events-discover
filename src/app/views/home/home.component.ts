import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsListComponent } from '../../components/events-list/events-list.component';
import { IEvent } from '../../interfaces/event';
import {
  Observable,
  Subject,
  Subscription,
  scan,
  shareReplay,
  startWith,
  switchMap
} from 'rxjs';
import { EventsService } from '../../services/events.service';
import { ContainerComponent } from '../../components/container/container.component';
import { SectionHeadingComponent } from '../../components/section-heading/section-heading.component';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';
import { EventsFilterComponent } from '../../components/events-filter/events-filter.component';
import { EventsFilterModel } from '../../types/event';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    EventsListComponent,
    ContainerComponent,
    SectionHeadingComponent,
    EventsFilterComponent,
    InfiniteScrollDirective,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  events$ = new Observable<IEvent[]>();
  loadMoreEvents = new Subject<void>();
  filter = {} as EventsFilterModel;
  totalPages = 0;
  page = 0;
  private subscriptions = new Subscription();

  constructor(
    private eventsService: EventsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.subscribeQueryParams();
    this.subscribeFilter();
    this.subscribeTotalPages();
    this.signEvents();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  subscribeQueryParams() {
    const subscription = this.activatedRoute.queryParams.subscribe((params) => {
      this.page = 0;

      this.eventsService.setFilter(this.eventsService.getFilterModelFromParams(params));

      this.signEvents();
    });

    this.subscriptions.add(subscription);
  }

  subscribeFilter() {
    const subscription = this.eventsService.currentFilter$.subscribe((filter) => {
      this.filter = filter;
    });

    this.subscriptions.add(subscription);
  }

  signEvents() {
    this.events$ = this.loadMoreEvents
      .pipe(
        startWith(null),
        switchMap(() => this.eventsService.getEvents(this.filter, this.page++)),
        scan((acc, events) => [...acc, ...events] as IEvent[], [] as IEvent[]),
        shareReplay(1),
      );
  }

  subscribeTotalPages() {
    const subscription = this.eventsService.totalPages$.subscribe((totalPages) => {
      this.totalPages = totalPages;
    });

    this.subscriptions.add(subscription);
  }

  handleLoadMore() {
    this.loadMoreEvents.next();
  }
}
