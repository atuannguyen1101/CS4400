import { AppRoutingModule, routingComponents } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { SearchDetailComponent } from './search-detail/search-detail.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { HistoryViewComponent } from './history-view/history-view.component';
import { ShowViewComponent } from './show-view/show-view.component';
import { AddDetailComponent } from './add-detail/add-detail.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    SearchDetailComponent,
    DetailViewComponent,
    HistoryViewComponent,
    ShowViewComponent,
    AddDetailComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
