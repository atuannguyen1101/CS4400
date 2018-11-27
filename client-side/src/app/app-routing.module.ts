import { AnimalCareComponent } from './animal-care/animal-care.component';
import { ViewVisitorsComponent } from './detail-view/view-visitors/view-visitors.component';
import { navTopComponent } from './main/navTop/navTop.component';
import { ShowAddDetailComponent } from './add-detail/show-add-detail/show-add-detail.component';
import { AnimalDetailViewComponent } from './detail-view/animal-detail-view/animal-detail-view.component';
import { ExhibitDetailViewComponent } from './detail-view/exhibit-detail-view/exhibit-detail-view.component';
import { AnimalDetailComponent } from './add-detail/animal-detail/animal-detail.component';
import { HomeStaffComponent } from './home/home-staff/home-staff.component';
import { HomeAdminComponent } from './home/home-admin/home-admin.component';
import { HomeVisitorComponent } from './home/home-visitor/home-visitor.component';
import { AddDetailComponent } from './add-detail/add-detail.component';
import { ShowViewComponent } from './show-view/show-view.component';
import { SearchDetailComponent } from './search-detail/search-detail.component';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { LoginComponent } from './main/login/login.component';
import { RegisterComponent } from './main/register/register.component';
import { ForgotpassComponent } from './main/forgotpass/forgotpass.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { HistoryViewComponent } from './history-view/history-view.component';
import { AuthGuard } from './_guards/auth.guard';
import { ExhibitHistoryComponent } from './history-view/exhibit-history/exhibit-history.component';
import { ShowHistoryComponent } from './history-view/show-history/show-history.component';
import { ViewStaffComponent } from './detail-view/view-staff/view-staff.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [ AuthGuard ] },
    // { path: '**', redirectTo: "login", pathMatch: "full"},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home-view', component: HomeComponent },
    { path: 'forgotpassword', component: ForgotpassComponent },
    { path: 'detail-view', component: DetailViewComponent },
    { path: 'search-detail', component: SearchDetailComponent },
    { path: 'show-view', component: ShowViewComponent },
    { path: 'history-view', component: HistoryViewComponent },
    { path: 'add-detail', component: AddDetailComponent },
    { path: 'home-visitor', component: HomeVisitorComponent},
    { path: 'home-staff', component: HomeStaffComponent},
    { path: 'home-admin', component: HomeAdminComponent},
    { path: 'animal-detail-add', component: AnimalDetailComponent},
    { path: 'animal-detail', component: AnimalDetailViewComponent},
    { path: 'exibit-detail', component: ExhibitDetailViewComponent},
    { path: 'add-show', component: ShowAddDetailComponent},
    { path: 'exhibit-history', component: ExhibitHistoryComponent},
    { path: 'show-history', component: ShowHistoryComponent},
    { path: 'admin-view-staff', component: ViewStaffComponent},
    { path: 'admin-view-visitors', component: ViewVisitorsComponent},
    { path: 'animal-care', component: AnimalCareComponent}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponents = [
    LoginComponent, RegisterComponent, ForgotpassComponent,
    MainComponent, HomeComponent, DetailViewComponent, SearchDetailComponent, ShowViewComponent,HistoryViewComponent, AddDetailComponent, HomeAdminComponent, HomeVisitorComponent,HomeStaffComponent, AnimalDetailComponent, AnimalDetailViewComponent,ExhibitDetailViewComponent, ShowAddDetailComponent,
    navTopComponent, ExhibitHistoryComponent, ShowHistoryComponent, ViewStaffComponent, ViewVisitorsComponent, AnimalCareComponent
];

