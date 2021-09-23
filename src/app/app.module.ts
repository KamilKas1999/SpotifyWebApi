import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from './shared/AuthGuard';
import { PanelComponent } from './pages/recommend/panel/panel.component';
import { RecommendComponent } from './pages/recommend/recommend.component';
import { StatisticComponent } from './pages/statistic/statistic.component';
import { MusicCardComponent } from './components/music-card/music-card.component';
import { LoadingComponent } from './components/loading/loading.component';
import { TokenInterceptor } from './shared/token.interceptor';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import {MatSliderModule } from '@angular/material/slider';
import { TrackComponent } from './pages/track/track.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    StatisticComponent,
    RecommendComponent,
    PanelComponent,
    MusicCardComponent,
    LoadingComponent,
    MusicPlayerComponent,
    TrackComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    MatSliderModule,
  ],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
