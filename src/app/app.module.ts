import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AuthGuardService } from './security/AuthGuard';
import { LoadingComponent } from './components/loading/loading.component';
import { TokenInterceptor } from './security/token.interceptor';
import { MusicPlayerComponent } from './components/music-player/music-player.component';
import { RecommendModule } from './modules/recommend/recommend.module';
import { TopModule } from './modules/top/top.module';
import { TrackModule } from './modules/track/track.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    LoadingComponent,
    MusicPlayerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    RecommendModule,
    TopModule,
    TrackModule,
  ],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
