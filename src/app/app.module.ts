import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { StatisticComponent } from './statistic/statistic.component';
import { TopElementComponent } from './statistic/top-element/top-element.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RecommendComponent } from './recommend/recommend.component';
import { RecommendItemComponent } from './recommend/recommend-item/recommend-item.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    StatisticComponent,
    TopElementComponent,
    RecommendComponent,
    RecommendItemComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
