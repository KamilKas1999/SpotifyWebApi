import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeLoggedComponent } from './home-logged.component';
import { UserService } from 'src/app/services/user/user.service';
import {  of } from 'rxjs';

describe('HomeLoggedComponent', () => {
  let component: HomeLoggedComponent;
  let fixture: ComponentFixture<HomeLoggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [HomeLoggedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeLoggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get name', async () => {
    let userService = fixture.debugElement.injector.get(UserService);
    spyOn(userService, 'getUserInfo').and.returnValue(
      of({ display_name: 'John Doe' })
    );
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenRenderingDone().then(() => {
      expect(component.name).toEqual('John Doe');
    });
  });
});
