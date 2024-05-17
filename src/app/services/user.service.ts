import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { user } from '../classes/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 token:any=localStorage.getItem('token');
 
headerAdmin=new HttpHeaders()
.set('authorization',this.token)
.set('role','admin')

  constructor(private http: HttpClient) {

  }




  register(user: user): Observable<user> {
    return this.http.post<user>('http://localhost:4000/api/user/register', user);
  }

 /* login(user: user): Observable<user> {
    return this.http.post<user>('http://localhost:4000/api/user/login', user)
   .pipe(
      tap((loggedInUser: user) => {
        // Stockez l'ID de l'utilisateur après la connexion réussie
        this.userId = loggedInUser._id; 
      })
    );; } */
    login(user: user): Observable<user> {
      return this.http.post<user>('http://localhost:4000/api/user/login', user)
     ; } 


     updateProfile(userId: string, user: user): Observable<user> {
      return this.http.put<user>(`http://localhost:4000/api/user/${userId}`, user);
    }

  
 /* getAllUsers(): Observable<user[]> {
    return this.http.get<user[]>('http://localhost:4000/api/user');
  }

  getUserById(userId: string): Observable<user> {
    return this.http.get<user>(`http://localhost:4000/api/user/${userId}`);
  } */

  getAllUsers(): Observable<user[]> {
    return this.http.get<user[]>('http://localhost:4000/api/user',{headers:this.headerAdmin});
  }

  addEmployee(employee: user): Observable<any> {
    return this.http.post<any>('http://localhost:4000/api/user/addEmployee', employee,{headers:this.headerAdmin});
  }

  updateEmployee(employee: user, userId: string): Observable<any> {
    return this.http.put<any>(`http://localhost:4000/api/user/updateEmployee/${userId}`, employee);
  }

  deleteEmployee(userId: string): Observable<any> {
    return this.http.delete<any>(`http://localhost:4000/api/user/${userId}`,{headers:this.headerAdmin});
  }

  getUserById(userId: string): Observable<user> {
    return this.http.get<user>(`http://localhost:4000/api/user/${userId}`);
  }


}
