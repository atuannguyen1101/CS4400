import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { AnimalDetailComponent } from './add-detail/animal-detail/animal-detail.component';
import { AnimalDetailViewComponent } from './detail-view/animal-detail-view/animal-detail-view.component';
import { ExhibitDetailViewComponent } from './detail-view/exhibit-detail-view/exhibit-detail-view.component';
import { ShowAddDetailComponent } from './add-detail/show-add-detail/show-add-detail.component';
import { MatDatepickerModule,
  MatNativeDateModule,
  MatFormFieldModule,
  MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    RoutingComponents,
    AnimalDetailComponent,
    AnimalDetailViewComponent,
    ExhibitDetailViewComponent,
    ShowAddDetailComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  exports: [
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    BrowserAnimationsModule
  ],
  providers: [MatDatepickerModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
