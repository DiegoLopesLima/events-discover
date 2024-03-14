import { Pipe, PipeTransform } from '@angular/core';
import type { IEvent, IEventImage } from '../interfaces/event';

type ImageCoverSize = 'listItem' | 'details';

const findCallbacks: Record<ImageCoverSize, (eventImage: IEventImage) => boolean> = {
  listItem: ({ ratio, width }) => ratio === '3_2' && width === 640,
  details: ({ ratio, width }) => ratio === '16_9' && width === 1024,
};

@Pipe({
  name: 'getEventCoverImage',
  standalone: true
})
export class GetEventCoverImagePipe implements PipeTransform {
  transform(event: IEvent | null, size: ImageCoverSize = 'listItem'): string | undefined {
    return event?.images?.find?.(findCallbacks[size])?.url;
  }
}
