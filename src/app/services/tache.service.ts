import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tache } from '../classes/tache';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TacheService {
  private url="http://localhost:4000/api/taches"

  token:any=localStorage.getItem('token');
 
header=new HttpHeaders()
.set('authorization',this.token)


  constructor(private http: HttpClient) { }
  getAll(): Observable<Tache[]> {
    return this.http.get<Tache[]>('http://localhost:4000/api/taches',{headers:this.header});
  }
  AddTache(addtacheRequest:Tache){
    
    return this.http.post<Tache>(`${this.url}`,addtacheRequest,{headers:this.header});
  } 
  deleteTache(tacheId: string): Observable<Tache> {
    const url = `${this.url}/${tacheId}`;
    return this.http.delete<Tache>(url,{headers:this.header});
  }
  updateTache(tacheId: string | undefined, updatedTache: Tache): Observable<Tache> {
    const url = `${this.url}/${tacheId}`;
    
    // Utilisation de la méthode HTTP PUT pour mettre à jour la tâche
    return this.http.put<Tache>(url, updatedTache,{headers:this.header});
  }
  updateEtatTache(tacheId: string, etat: boolean): Observable<Tache> {
    const url = `${this.url}/${tacheId}/etat`;
    return this.http.put<Tache>(url, { etat });
  }

    // Récupérer toutes les tâches d'un utilisateur

    getTacheByUser(userId: string): Observable<Tache[]> {
      const url = `${this.url}/user/${userId}`;
      console.log(url);
      return this.http.get<Tache[]>(url,{headers:this.header});
    }
    
  
    // Ajouter une tâche pour un utilisateur

postTacheByUser(userId: string, addTacheRequest: Tache): Observable<Tache> {
  return this.http.post<Tache>(`${this.url}/user/${userId}`, addTacheRequest,{headers:this.header});
}

getAllTachesBySearchTermForUser(userId: string, searchTerm: string): Observable<Tache[]> {
  return this.http.get<Tache[]>(`http://localhost:4000/api/taches/${userId}/search/${searchTerm}`);
}




sendEmail(to: string, html: string) {
  return this.http.post<any>(`${this.url}/sendemail`, { to, html });
}
  
}
