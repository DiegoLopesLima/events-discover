import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { EventsListComponent } from '../../components/events-list/events-list.component';
import { IEvent } from '../../interfaces/event';
import {
  Observable,
  Subject,
  Subscription,
  scan,
  shareReplay,
  startWith,
  switchMap,
  takeUntil,
} from 'rxjs';
import { EventsService } from '../../services/events.service';
import { ContainerComponent } from '../../components/container/container.component';
import { SectionHeadingComponent } from '../../components/section-heading/section-heading.component';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollDirective } from '../../directives/infinite-scroll.directive';
import { EventsFilterComponent } from '../../components/events-filter/events-filter.component';
import { EventsFilterModel } from '../../types/event';
import { AsyncPipe, isPlatformBrowser } from '@angular/common';

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
export class HomeViewComponent implements OnInit, OnDestroy {
  events$ = new Observable<IEvent[]>();
  totalPages = 0;
  page = 0;
  private filter = {} as EventsFilterModel;
  private loadMoreEvents = new Subject<void>();
  private subscriptions = new Subscription();
  private unsubscribeEvents$ = new Subject<void>();

  constructor(
    private eventsService: EventsService,
    private activatedRoute: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}


  ngOnInit() {
    this.subscribeQueryParams();
    this.subscribeFilter();
    this.subscribeTotalPages();
    this.signEvents();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    this.unsubscribeEvents$.next();
    this.unsubscribeEvents$.complete();
  }

  subscribeQueryParams() {
    const subscription = this.activatedRoute.queryParams.subscribe((params) => {
      this.eventsService.setFilter(this.eventsService.getFilterModelFromParams(params));

        this.page = 0;

      this.handleResetScroll();
      this.unsubscribeEvents$.next();
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
        takeUntil(this.unsubscribeEvents$),
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
    if (this.page < this.totalPages) {
      this.loadMoreEvents.next();
    }
  }

  handleResetScroll() {
    if (isPlatformBrowser(this.platformId)) {
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  }
}
