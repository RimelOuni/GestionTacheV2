import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tache } from 'src/app/classes/tache';
import { AuthService } from 'src/app/services/auth.service';
import { TacheService } from 'src/app/services/tache.service';

@Component({
  selector: 'app-ajouter-tache',
  templateUrl: './ajouter-tache.component.html',
  styleUrls: ['./ajouter-tache.component.css']
})
export class AjouterTacheComponent implements OnInit {
  newTache: Tache = { _id:'', titre: '', description: '', etat: false, date: new Date() ,userId: '',};
  userId: any = localStorage.getItem('userId');
  today: string | undefined;
  constructor(private tacheService: TacheService, private router: Router, private authService:AuthService) { }

  ngOnInit(): void {
    this.today = new Date().toISOString().split('T')[0];
  }
  onSubmit(): void {
 
     
    this.tacheService.postTacheByUser(this.userId, this.newTache).subscribe(() => {
      this.resetForm();
      this.router.navigate(['/list-taches']);
    });
  
}
  resetForm(): void {
  
    this.newTache = {_id:'', titre: '', description: '', etat: false, date: new Date(),userId: '', };
    this.router.navigate(['/list-taches']);
    
  }
  logout() {
    this.authService.logout(); 
      }
}
