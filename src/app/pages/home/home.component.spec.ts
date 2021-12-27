import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [HomeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render app-home-logged', () => {
    component.isLogin = true;
    let debug = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(debug.querySelector('app-home-logged')).toBeTruthy();
  })

  it('should render app-home-not-logger', () => {
    component.isLogin = false;
    let debug = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(debug.querySelector('app-home-not-logged')).toBeTruthy();
  })
});
