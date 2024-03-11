export interface IEventImage {
  url: string;
  width: number;
  height: number;
  ratio: string;
}

export interface IEvent {
  id: string;
  name: string;
  url: string;
  images: IEventImage[];
  cover: IEventImage;
}