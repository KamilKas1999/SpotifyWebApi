import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuardService } from '../../security/AuthGuard';
import { TopComponent } from './pages/top/top.component';

const topRoutes: Routes = [
  {
    path: 'top',
    component: TopComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(topRoutes)],
  exports: [RouterModule],
})
export class TopRoutingModule {}
