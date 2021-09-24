import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicCardComponent } from './components/music-card/music-card.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedRoutingModule } from './shared-routing.module';

@NgModule({
  declarations: [MusicCardComponent],
  imports: [CommonModule, HttpClientModule, SharedRoutingModule],
  exports: [MusicCardComponent]
})
export class SharedModule {}
