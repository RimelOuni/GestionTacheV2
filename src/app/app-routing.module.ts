import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './employe/home/home.component';
import { AcceuilComponent } from './employe/acceuil/acceuil.component';
import { ListTachesComponent } from './employe/list-taches/list-taches.component';
import { HeaderComponent } from './employe/header/header.component';
import { DashboardAdminComponent } from './admin/dashboard-admin/dashboard-admin.component';
import { HomeAdminComponent } from './admin/home-admin/home-admin.component';
import { SearchComponent } from './employe/search/search.component';
import { AjouterTacheComponent } from './employe/ajouter-tache/ajouter-tache.component';
import { ProfilComponent } from './employe/profil/profil.component';

const routes: Routes = [
  {path:'log-in', title:'log-in',component:LoginComponent},
  {path:'sign-up', title:'sign-up',component:SignupComponent},
  {path:'home', title:'home',component:HomeComponent},
  {path:'acceuil', title:'acceuil',component:AcceuilComponent},
  {path:'admindashboard', title:'admindashboard',component:DashboardAdminComponent},
  {path:'homeAdmin', title:'homeAdmin',component:HomeAdminComponent},
  {path:'list-taches', title:'list-taches',component:ListTachesComponent},
  { path: 'search/:userId/:searchTerm', component: ListTachesComponent },
  {path:'ajouter',title :'ajouter' , component:AjouterTacheComponent},
  {path:'profil',title :'profil' , component:ProfilComponent},


  
  { path: '', redirectTo: '/log-in', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
