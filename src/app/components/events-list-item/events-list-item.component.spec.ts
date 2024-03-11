import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsListItemComponent } from './events-list-item.component';

describe('EventsListItemComponent', () => {
  let component: EventsListItemComponent;
  let fixture: ComponentFixture<EventsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EventsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
