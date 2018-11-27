import { AuthService } from './_guards/auth.service';
import { AuthGuard } from './_guards/auth.guard';
import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { AppMaterialModule } from './app-material/app-material.module';
import { SpinnerModule } from 'primeng/components/spinner/spinner';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    RoutingComponents,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SpinnerModule
  ],
  exports: [
    BrowserAnimationsModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
