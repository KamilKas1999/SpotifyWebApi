import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecommendComponent } from './pages/recommend/recommend.component';

import { AuthGuardService } from '../../security/AuthGuard';

const recommendRoutes: Routes = [
  {
    path: 'recommend',
    component: RecommendComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(recommendRoutes)],
  exports: [RouterModule],
})
export class RecommendRoutingModule {}
