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
import { RecommendModule } from './modules/recommend/recommend.module';
import { TopModule } from './modules/top/top.module';
import { AuthGuardService } from './security/AuthGuard';
import { SharedModule } from './modules/shared/shared.module';
import { HomeLoggedComponent } from './components/home-logged/home-logged.component';
import { HomeNotLoggedComponent } from './components/home-not-logged/home-not-logged.component';
import { MessageComponent } from './components/message/message.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SessionExpiredComponent } from './pages/session-expired/session-expired.component';
import { TokenInterceptor } from './security/token-intertceptor/token.interceptor';
import { DetailsModule } from './modules/details/details.module';
import { NavbarComponent } from './components/navbar/navbar.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    HomeLoggedComponent,
    HomeNotLoggedComponent,
    MessageComponent,
    SessionExpiredComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    RecommendModule,
    DetailsModule,
    TopModule,
    SharedModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
