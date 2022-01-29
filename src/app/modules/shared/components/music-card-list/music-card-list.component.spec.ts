import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicCardListComponent } from './music-card-list.component';

describe('MusicCardListComponent', () => {
  let component: MusicCardListComponent;
  let fixture: ComponentFixture<MusicCardListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicCardListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicCardListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
