import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendItemComponent } from './recommend-item.component';

describe('RecommendItemComponent', () => {
  let component: RecommendItemComponent;
  let fixture: ComponentFixture<RecommendItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
