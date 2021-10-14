import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallerLoadingComponent } from './smaller-loading.component';

describe('SmallerLoadingComponent', () => {
  let component: SmallerLoadingComponent;
  let fixture: ComponentFixture<SmallerLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallerLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmallerLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
