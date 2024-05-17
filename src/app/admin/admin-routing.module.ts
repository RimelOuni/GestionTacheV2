import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { AuthEmpGuard } from '../auth-emp.guard';

const routes: Routes = [
  {path:'admin', component:HomeAdminComponent,
  canActivate: [AuthEmpGuard],
  children:[
    {path:'', redirectTo:'admindashboard', pathMatch:'full'},
    {path:'admindashboard', title:'admindashboard',component:DashboardAdminComponent},
  {path:'homeAdmin', title:'homeAdmin',component:HomeAdminComponent},
  ]
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
