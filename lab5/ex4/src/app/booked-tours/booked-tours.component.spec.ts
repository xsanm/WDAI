import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookedToursComponent } from './booked-tours.component';

describe('BookedToursComponent', () => {
  let component: BookedToursComponent;
  let fixture: ComponentFixture<BookedToursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BookedToursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookedToursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
