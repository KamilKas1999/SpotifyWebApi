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
  @Output('close') closeModel = new EventEmitter<boolean>();
  @Output('add') addNew = new EventEmitter<any>();
  mode = 1;
  constructor() {}

  ngOnInit(): void {}

  setMode(mode: number) {
    this.mode = mode;
  }

  onAdd(object: any){
    this.addNew.emit(object);
  }
  
  close() {
    this.closeModel.emit(true);
  }
}
