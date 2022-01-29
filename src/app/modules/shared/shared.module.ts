import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicCardComponent } from './components/music-card/music-card.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedRoutingModule } from '../track/track-routing.module';
import { LoadingComponent } from './components/loading/loading.component';
import { SmallerLoadingComponent } from './components/smaller-loading/smaller-loading.component';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { MusicCardListComponent } from './components/music-card-list/music-card-list.component';

@NgModule({
  declarations: [
    MusicCardComponent,
    LoadingComponent,
    SmallerLoadingComponent,
    MusicPlayerComponent,
    MusicCardListComponent,
  ],
  imports: [CommonModule, HttpClientModule, SharedRoutingModule],
  exports: [
    MusicCardComponent,
    LoadingComponent,
    SmallerLoadingComponent,
    MusicPlayerComponent,
    MusicCardListComponent
  ],
})
export class SharedModule {}
