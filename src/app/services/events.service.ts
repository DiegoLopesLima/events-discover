import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IEvent } from '../interfaces/event';
import { BehaviorSubject, catchError, map, scan, tap, throwError } from 'rxjs';
import { EventsFilterModel, EventsFilterParams } from '../types/event';
import { format } from 'date-fns';

export interface IEventsResponse {
  _embedded: {
    events: IEvent[];
  };
  page: {
    number: number,
    size: number,
    totalPages: number,
  }
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private baseURL = 'https://app.ticketmaster.com/discovery/v2/events.json';
  private consumerKey = environment.ticketMasterAPIKey!;
  private filter$ = new BehaviorSubject<EventsFilterModel>({} as EventsFilterModel);
  private pages$ = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}

  get currentFilter$() {
    return this.filter$.asObservable();
  }

  get totalPages$() {
    return this.pages$.asObservable();
  }

  getEvents(filter: EventsFilterModel, page = 0) {
    return this.http.get<IEventsResponse>(this.baseURL, {
      params: {
        ...this.getFilterParamsFromModel(filter),
        page,
        apikey: this.consumerKey,
      },
    })
      .pipe(
        tap((response) => {
          this.pages$.next(response.page.totalPages);
        }),
        map(response => response._embedded?.events ?? []),
      )
      .pipe(
        catchError(this.handleGetEventsError)
      );
  }

  private handleGetEventsError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }

    return throwError(() => new Error('An unexpected error occurred. Please try again later.'));
  }

  getFilterModelFromParams({
    countryCode,
    startDateTime,
    endDateTime,
    stateCode,
    city,
  }: EventsFilterParams): EventsFilterModel {
    return {
      countryCode: countryCode ?? 'AU',
      startDateTime: startDateTime ? new Date(startDateTime) : null,
      endDateTime: endDateTime ? new Date(endDateTime) : null,
      stateCode,
      city,
    };
  }

  getFilterParamsFromModel({
    countryCode,
    startDateTime,
    endDateTime,
    stateCode,
    city,
  }: EventsFilterModel): EventsFilterParams {
    const params: EventsFilterParams = {
      countryCode: countryCode ? countryCode : undefined,
      stateCode: stateCode ? stateCode : undefined,
      city: city ? city : undefined,
      startDateTime: startDateTime ? format(startDateTime, 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'') : undefined,
      endDateTime: endDateTime ? format(endDateTime, 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'') : undefined,
    };

    Object.keys(params).forEach((key) => {
      if (typeof params[key as keyof EventsFilterParams] === 'undefined') {
        delete params[key as keyof EventsFilterParams];
      }
    });

    return params;
  }

  setFilter(filter: EventsFilterModel) {
    this.filter$.next(filter);
  }
}
