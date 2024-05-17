import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ListTachesComponent } from './list-taches/list-taches.component';
import { HeaderComponent } from './header/header.component';
import { AuthEmpGuard } from '../auth-emp.guard';
import { AjouterTacheComponent } from './ajouter-tache/ajouter-tache.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
  {path:'emp', component:HomeComponent,
  canActivate: [AuthEmpGuard],
  children:[
    {path:'', redirectTo:'acceuil', pathMatch:'full'},
    {path:'acceuil', title:'acceuil',component:AcceuilComponent},
    {path:'list-taches', title:'list-taches',component:ListTachesComponent},
    {path:'ajouter',title :'ajouter' , component:AjouterTacheComponent},
    {path:'profil',title :'profil' , component:ProfilComponent},
    {path:'search/:searchTerm', component:ListTachesComponent},
    
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeRoutingModule { }
