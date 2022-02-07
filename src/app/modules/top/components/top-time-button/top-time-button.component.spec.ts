import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTimeButtonComponent } from './top-time-button.component';

describe('TopTimeButtonComponent', () => {
  let component: TopTimeButtonComponent;
  let fixture: ComponentFixture<TopTimeButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopTimeButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopTimeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
