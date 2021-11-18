import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MusicCardComponent } from './music-card.component';
import { songInfo } from '../../models/songInfo.model';

describe('MusicCard', () => {
  let component: MusicCardComponent;
  let fixture: ComponentFixture<MusicCardComponent>;
  let mockTrack: songInfo = {
    album: {
      albym_type: '',
      artists: [],
      available_markets: [],
      external_urls: {
        spotify: '',
      },
      href: '',
      id: '',
      images: [
        { width: 0, height: 0, url: '' },
        { width: 0, height: 0, url: '' },
      ],
      name: '',
      release_date: '',
      release_date_precision: '',
      total_tracks: 0,
      type: '',
      uri: '',
    },
    artists: [],
    available_markets: [],
    disc_number: 0,
    duration_ms: 0,
    explicit: false,
    external_ids: {
      isrc: '',
    },
    external_urls: {
      spotify: '',
    },
    href: '',
    id: '',
    is_local: false,
    name: '',
    popularity: 0,
    preview_url: '',
    track_number: 0,
    type: '',
    uri: '',
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MusicCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicCardComponent);
    component = fixture.componentInstance;
    component.track = mockTrack;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
