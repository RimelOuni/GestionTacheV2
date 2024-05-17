import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 // private loggedInUser: any;
 
  public loggedInUser ={ 
    _id:'',
     nom: '',
    
        role: '',
      
      };

    

     helper = new JwtHelperService();
  
  constructor(private router: Router,private http: HttpClient) { }

 /* public isAuthenticated():boolean{
    const token =localStorage.getItem('token');
    if(!token){
      this.router.navigate(['/']);
      return false;
    }
    else{
      return true;
    }
  }

  login(username: string, pwd: string) {
    if (username === 'emp' && pwd === 'pwd') {
      this.user.role = 'employe';
    } else if (username === 'admin' && pwd === 'pwdD') {
      this.user.role = 'admin';
    } else {
      this.user.role = '';
    }
  } */
  login(data:any){
    return this.http.post('http://localhost:4000/api/user/login', data)
  }

  saveData(token:any){
  let decodeToken= this.helper.decodeToken(token);

  localStorage.setItem('token',token);
  localStorage.setItem('userId',decodeToken.userId);
  localStorage.setItem('nom',decodeToken.nom);
  localStorage.setItem('email',decodeToken.email);
  localStorage.setItem('motdepasse',decodeToken.motdepasse);
  localStorage.setItem('role',decodeToken.role);
  console.log(decodeToken);
    
  }

  /*
public getNom(){
  let token:any=localStorage.getItem('token')
  let decodeToken=this.helper.decodeToken(token)

  return decodeToken.nom
}
*/
public  LoggedInAdmin(){
  let token:any=localStorage.getItem('token')
  let decodeToken=this.helper.decodeToken(token)

  let role=decodeToken.role

  if(role!=='admin'){
    return false
  }

  if(this.helper.isTokenExpired(token)){
    return false
  }
  return true
  
} 
public  LoggedInUser(){
  let token:any=localStorage.getItem('token')
  let decodeToken=this.helper.decodeToken(token)

  let role=decodeToken.role

  if(role!=='employe'){
    return false
  }

  if(this.helper.isTokenExpired(token)){
    return false
  }
  return true
  
} 


  public   logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('nom');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('motdepasse');

    this.router.navigate(['/log-in']);

   
  }


}

