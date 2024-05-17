import { Component, OnInit } from '@angular/core';
import { Tache } from 'src/app/classes/tache';
import { Subscription } from 'rxjs';
import { TacheService } from 'src/app/services/tache.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  public totalTasks: number = 0;
  public completedTasks: number = 0;
  public tasksSubscription!: Subscription;
  userId: any = localStorage.getItem('userId');
  nom:any;
  

  constructor(private taskService: TacheService, private router: Router,private authService:AuthService) { 
    this.nom=localStorage.getItem('nom');
  }

  ngOnInit(): void {
    // Utilisez votre service de gestion des tâches pour obtenir des informations
    this.tasksSubscription = this.taskService.getTacheByUser(this.userId).subscribe(
      (tasks: Tache[]) => {
        this.totalTasks = tasks.length;
        this.completedTasks = tasks.filter(task => task.etat==true).length;
      },
      error => {
        console.error('Erreur lors de la récupération des tâches :', error);
      }
    );
  }
  logout() {
    this.authService.logout(); 
      }


}
