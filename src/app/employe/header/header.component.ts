import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Tache } from 'src/app/classes/tache';
import { AuthService } from 'src/app/services/auth.service';
import { TacheService } from 'src/app/services/tache.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nom:any
  public totalTasks: number = 0;
  public completedTasks: number = 0;
  public tasksSubscription!: Subscription;
  userId: any = localStorage.getItem('userId');
  constructor(private taskService: TacheService, private router:Router,private authService :AuthService) { 
    console.log(this.authService.LoggedInUser());
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
