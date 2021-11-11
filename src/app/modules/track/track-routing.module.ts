import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuardService } from '../../security/AuthGuard';
import { TrackComponent } from './pages/track/track.component';

const trackRoutes: Routes = [
  {
    path: 'track/:id',
    component: TrackComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(trackRoutes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
