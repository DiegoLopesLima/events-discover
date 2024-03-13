import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { supportedCountries } from '../../constants/countries';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import type { EventsFilterModel } from '../../types/event';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-events-filter',
  standalone: true,
  imports: [
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './events-filter.component.html',
  styleUrl: './events-filter.component.scss'
})
export class EventsFilterComponent implements OnInit, OnDestroy {
  supportedCountries = supportedCountries;
  filterModel: EventsFilterModel = {
    countryCode: 'AU',
    startDateTime: null,
    endDateTime: null,
    stateCode: undefined,
    city: undefined,
  };
  private subscriptions = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventsService: EventsService,
  ) {}

  ngOnInit() {
    this.subscribeQueryParams();
    this.subscribeFilter();
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  handleModelChange() {
    this.eventsService.setFilter(this.filterModel);
  }

  subscribeQueryParams() {
    const subscription = this.activatedRoute.queryParams.subscribe((params) => {
      this.filterModel = this.eventsService.getFilterModelFromParams(params);

      this.eventsService.setFilter(this.filterModel);
    });

    this.subscriptions.add(subscription);
  }

  subscribeFilter() {
    const subscription = this.eventsService.currentFilter$.subscribe((filter) => {
      this.router.navigate(
        [],
        {
          relativeTo: this.activatedRoute,
          queryParams: this.eventsService.getFilterParamsFromModel(filter),
          replaceUrl: true,
        }
      );
    });

    this.subscriptions.add(subscription);
  }
}
