import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuardService } from '../../security/AuthGuard';
import { ArtistComponent } from './pages/artist/artist.component';
import { TrackComponent } from './pages/track/track.component';

const trackRoutes: Routes = [
  {
    path: 'track/:id',
    component: TrackComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'artist/:id',
    component: ArtistComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(trackRoutes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
