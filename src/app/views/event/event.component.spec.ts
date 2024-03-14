import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventViewComponent } from './event.component';

describe('EventComponent', () => {
  let component: EventViewComponent;
  let fixture: ComponentFixture<EventViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
