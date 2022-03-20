import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterModule.forRoot([]), HttpClientTestingModule],
      declarations: [HeaderComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get name', async () => {
    let userService = fixture.debugElement.injector.get(UserService);
    spyOn(userService, 'getUserInfo').and.returnValue(
      of({ display_name: 'John Doe', images: [], id: '0', product: 'product' })
    );
    fixture.detectChanges();
    component.ngOnInit();
    fixture.whenRenderingDone().then(() => {
      expect(component.user.display_name).toEqual('John Doe');
    });
  });
});
