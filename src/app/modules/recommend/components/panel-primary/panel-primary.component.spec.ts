import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelPrimaryComponent } from './panel-primary.component';

describe('PanelPrimaryComponent', () => {
  let component: PanelPrimaryComponent;
  let fixture: ComponentFixture<PanelPrimaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelPrimaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelPrimaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
