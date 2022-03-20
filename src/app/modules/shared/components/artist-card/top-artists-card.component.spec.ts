import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistCardComponent } from './top-artists-card.component';


describe('ArtistsCardComponent', () => {
  let component: ArtistCardComponent;
  let fixture: ComponentFixture<ArtistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtistCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
