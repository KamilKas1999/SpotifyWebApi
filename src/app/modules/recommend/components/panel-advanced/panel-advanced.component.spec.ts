import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelAdvancedComponent } from './panel-advanced.component';

describe('PanelAdvancedComponent', () => {
  let component: PanelAdvancedComponent;
  let fixture: ComponentFixture<PanelAdvancedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PanelAdvancedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelAdvancedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
