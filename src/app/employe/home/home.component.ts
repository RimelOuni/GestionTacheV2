import { Component, OnInit } from '@angular/core';
import { Tache } from 'src/app/classes/tache';
import { TacheService } from 'src/app/services/tache.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  taches: Tache[] = [];
  showAddForm = false;
  newTache: Tache = { _id:'', titre: '', description: '', etat: false, date: new Date(),userId: '', };
  editingTache: Tache | null = null;

  constructor(private tacheService: TacheService) { }

  ngOnInit(): void {
   
  }

   

}
