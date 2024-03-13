export type EventsFilterModel = {
  countryCode: string;
  startDateTime: Date | null;
  endDateTime: Date | null;
  stateCode: string | undefined;
  city: string | undefined;
};

export type EventsFilterParams = {
  countryCode?: string;
  startDateTime?: string;
  endDateTime?: string;
  stateCode?: string;
  city?: string;
};
