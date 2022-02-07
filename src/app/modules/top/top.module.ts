import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopRoutingModule } from './top-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TopComponent } from './pages/top/top.component';
import { TopArtistsComponent } from './pages/top-artists/top-artists.component';
import { TopArtistsCardComponent } from './components/top-artists-card/top-artists-card.component';
import { TopTimeButtonComponent } from './components/top-time-button/top-time-button.component';



@NgModule({
  declarations: [TopComponent, TopArtistsComponent, TopArtistsCardComponent, TopTimeButtonComponent],
  imports: [
    CommonModule,
    TopRoutingModule,
    SharedModule
  ]
})
export class TopModule { }
