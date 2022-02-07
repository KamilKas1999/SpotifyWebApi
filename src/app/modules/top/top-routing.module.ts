import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../security/AuthGuard';
import { TopArtistsComponent } from './pages/top-artists/top-artists.component';
import { TopComponent } from './pages/top/top.component';

const topRoutes: Routes = [
  {
    path: 'top/tracks',
    component: TopComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'top/artists',
    component: TopArtistsComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(topRoutes)],
  exports: [RouterModule],
})
export class TopRoutingModule {}
