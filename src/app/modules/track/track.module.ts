import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackComponent } from './pages/track/track.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [TrackComponent],
  imports: [CommonModule, SharedModule],
})
export class TrackModule {}
