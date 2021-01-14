import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopElementComponent } from './top-element.component';

describe('TopElementComponent', () => {
  let component: TopElementComponent;
  let fixture: ComponentFixture<TopElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopElementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
