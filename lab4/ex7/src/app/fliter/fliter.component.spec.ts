import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FliterComponent } from './fliter.component';

describe('FliterComponent', () => {
  let component: FliterComponent;
  let fixture: ComponentFixture<FliterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FliterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FliterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
