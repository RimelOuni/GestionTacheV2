import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent implements OnInit {
nom:any
  constructor(private router: Router,private authService:AuthService,private route:Router) { 
    this.nom=localStorage.getItem('nom')

    if(!localStorage.getItem('token')){
      console.log("not connected !");
      this.route.navigate(['/log-in'])
    }
    if(this.authService.LoggedInAdmin()==true){
      console.log("connected !")
    }else{
      console.log("not connected !")
      this.route.navigate(['/log-in'])
    }
  }

  ngOnInit(): void {
  }
  logout() {
this.authService.logout(); 
  }
}
