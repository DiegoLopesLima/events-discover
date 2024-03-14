export interface IEventImage {
  url: string;
  width: number;
  height: number;
  ratio: string;
}

export interface IEvent {
  id: string;
  name: string;
  info: string;
  url: string;
  images: IEventImage[];
  dates: {
    start: {
      dateTime: string;
    };
  };
  cover: IEventImage;
}
