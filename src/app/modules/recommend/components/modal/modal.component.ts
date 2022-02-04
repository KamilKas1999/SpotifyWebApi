import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ArtistShort } from '../../models/artistShort.model';
import { TrackShort } from '../../models/trackShort.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input('tracks') tracks: TrackShort[] = [];
  @Input('artists') artists: ArtistShort[] = [];
  @Input('genres') genres: string[];
  filteredGenres: string[] = [];
  @Input('mode') mode: number = 0;
  @Output('close') closeModel = new EventEmitter<boolean>();
  @Output('add') addNew = new EventEmitter<any>();
  artistOrTracks = 0;
  constructor() {}

  ngOnInit(): void {
    this.filteredGenres = this.genres;
  }

  setArtOrTra(value: number) {
    this.artistOrTracks = value;
  }

  onAdd(object: any) {
    this.addNew.emit(object);
  }

  close() {
    this.closeModel.emit(true);
  }

  filter(value: string){
     this.filteredGenres = this.genres.filter(el => el.includes(value.toLowerCase()));
  }
}
