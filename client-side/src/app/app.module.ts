import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SearchDetailComponent } from './search-detail/search-detail.component';
import { ExhibitDetailComponent } from './exhibit-detail/exhibit-detail.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { HistoryViewComponent } from './history-view/history-view.component';
import { ShowViewComponent } from './show-view/show-view.component';
import { AddDetailComponent } from './add-detail/add-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginSignupComponent,
    HomeComponent,
    FooterComponent,
    SearchDetailComponent,
    ExhibitDetailComponent,
    DetailViewComponent,
    HistoryViewComponent,
    ShowViewComponent,
    AddDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
