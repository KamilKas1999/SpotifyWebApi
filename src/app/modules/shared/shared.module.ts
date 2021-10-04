import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicCardComponent } from './components/music-card/music-card.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedRoutingModule } from './shared-routing.module';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [MusicCardComponent, LoadingComponent],
  imports: [CommonModule, HttpClientModule, SharedRoutingModule],
  exports: [MusicCardComponent,LoadingComponent]
})
export class SharedModule {}
