import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventsListComponent } from '../../components/events-list/events-list.component';
import { IEvent } from '../../interfaces/event';
import { Observable, Subscription } from 'rxjs';
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
  totalPages = 1;
  page = 0;
  filter = {} as EventsFilterModel;
  private subscriptions = new Subscription();

  constructor(
    private eventsService: EventsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.subscribeQueryParams();

    this.eventsService.currentFilter$.subscribe((filter) => {
      this.filter = filter;
    });
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  getEvents(filter: EventsFilterModel) {
    this.events$ = this.eventsService.getEvents(filter, this.page);
  }

  subscribeQueryParams() {
    const subscription = this.activatedRoute.queryParams.subscribe((params) => {
      this.getEvents(this.eventsService.getFilterModelFromParams(params));
    });

    this.subscriptions.add(subscription);
  }

  handleLoadMore() {
    console.log("handleLoadMore")
  }
}
