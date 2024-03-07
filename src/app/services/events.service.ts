import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IEvent } from '../interfaces/event';
import { map } from 'rxjs';

export interface IEventsResponse {
  _embedded: {
    events: IEvent[];
  };
}

@Injectable({
  providedIn: 'root',
})
export class EventsService {
  private baseURL = 'https://app.ticketmaster.com/discovery/v2/events.json';

  constructor(private http: HttpClient) {}

  retrieveEvents() {
    return this.http.get<IEventsResponse>(this.baseURL, {
      params: {
        apikey: environment.ticketMasterAPIKey!,
      },
    })
      .pipe(map((response) => response._embedded.events.map(event => ({
        ...event,
        cover: event.images.find(({ ratio, width }) => ratio === '3_2' && width === 305)!,
      }))));
  }
}
