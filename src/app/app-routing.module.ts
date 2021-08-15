import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RecommendComponent } from './pages/recommend/recommend.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { AuthGuardService } from './shared/AuthGuard';


const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'top', component: StatisticComponent, canActivate: [AuthGuardService]},
    {path: 'recommend', component: RecommendComponent, canActivate: [AuthGuardService]}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}