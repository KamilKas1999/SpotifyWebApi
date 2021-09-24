import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AuthGuardService } from '../../security/AuthGuard';
import { TrackComponent } from '../track/pages/track/track.component';

const sharedRoutes: Routes = [
  {
    path: 'track/:id',
    component: TrackComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(sharedRoutes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
