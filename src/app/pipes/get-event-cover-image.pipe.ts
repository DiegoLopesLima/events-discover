import { Pipe, PipeTransform } from '@angular/core';
import type { IEvent } from '../interfaces/event';

@Pipe({
  name: 'getEventCoverImage',
  standalone: true
})
export class GetEventCoverImagePipe implements PipeTransform {
  transform(event: IEvent): string {
    return event.images.find(({ ratio, width }) => ratio === '3_2' && width === 305)!?.url;
  }
}
