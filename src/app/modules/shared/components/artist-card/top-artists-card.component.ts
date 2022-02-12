import { Component, Input, OnInit } from '@angular/core';
import { Artist } from 'src/app/modules/shared/models/artist.model';

@Component({
  selector: 'app-artist-card',
  templateUrl: './top-artists-card.component.html',
  styleUrls: ['./top-artists-card.component.scss'],
})
export class ArtistCardComponent implements OnInit {
  @Input() artist: Artist;
  isOpen = false;

  constructor() {}

  onOpen() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit(): void {}

  getGenresShorted() {
    if (this.isOpen) return this.artist.genres;
    return this.artist.genres.slice(0, 8);
  }

  plusGenre() {
    if (this.isOpen) return 0;
    return this.artist.genres.length - 8;
  }

  ngOnDestroy(): void {}
}
