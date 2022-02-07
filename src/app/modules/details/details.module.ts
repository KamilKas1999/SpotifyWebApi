import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackComponent } from './pages/track/track.component';
import { SharedModule } from '../shared/shared.module';
import { ArtistComponent } from './pages/artist/artist.component';

@NgModule({
  declarations: [TrackComponent, ArtistComponent],
  imports: [CommonModule, SharedModule],
})
export class DetailsModule {}
