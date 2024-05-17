import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Tache } from 'src/app/classes/tache';
import { user } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { TacheService } from 'src/app/services/tache.service';
import { UserService } from 'src/app/services/user.service';
import { ModifyTacheDialogComponent } from '../modify-tache-dialog/modify-tache-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-taches',
  templateUrl: './list-taches.component.html',
  styleUrls: ['./list-taches.component.css']
})
export class ListTachesComponent implements OnInit {
  recipientEmail: string = '';
  taskList: string = '';
  currentUser: user  = { _id:'', nom: '', email: '', motdepasse: '', role: '',taches:[] };
  modifyTacheForm !: FormGroup;
  selectedTache: Tache | undefined;
  dialogRef: any;


  
  session:any;
  totalTaches:number = 0;
  taches: Tache[] = [];
  showAddForm = false;
  newTache: Tache = { _id:'', titre: '', description: '', etat: false, date: new Date() ,userId: '',};
  editingTache: Tache | null = null;

 userId: any = localStorage.getItem('userId');
 
 today: string | undefined;

 searchTerm: string = '';

  constructor(private fb: FormBuilder,private tacheService: TacheService,private userService: UserService,private router:Router,
    private activatedRoute: ActivatedRoute, private authService :AuthService
    , private dialog: MatDialog) {
 
   }





   searchTaches(): void {
    if (this.searchTerm.trim() === '') {
      this.loadTaches();
    } else {
      if (this.userId) {
        this.tacheService.getAllTachesBySearchTermForUser(this.userId, this.searchTerm).subscribe(
          taches => {
            this.taches = taches;
          },
          error => {
            console.error('Erreur lors de la recherche des tâches :', error);
          }
        );
      }
    }
  }
  

   



  ngOnInit(): void {
 
 this.today = new Date().toISOString().split('T')[0];
  console.log('UserID:', this.userId);
  this.loadTaches();
  

  this.modifyTacheForm = this.fb.group({
    titre: ['', Validators.required],
    description: ['', [Validators.required]],
    date: ['', [Validators.required]],
  });
  }


  loadTaches(): void {
    this.tacheService.getTacheByUser(this.userId).subscribe(
      
      taches => {
        this.taches = taches;
        this.taches.sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
      });

        console.log(this.taches);
      },
      
      error => {
        console.error('Erreur lors du chargement des tâches :', error);
      }
    );
    
  }



  

  addTache(): void {
    this.showAddForm = true;
  }

  onSubmit(): void {
 
     
      this.tacheService.postTacheByUser(this.userId, this.newTache).subscribe(() => {
        this.loadTaches();
        this.resetForm();
      });
    
  }
  deleteTache(tacheId: string): void {
    this.tacheService.deleteTache(tacheId).subscribe(() => {
      this.loadTaches();
    });
  }
  updateEtatTache(tache: Tache): void {
    this.tacheService.updateEtatTache(tache._id, tache.etat).subscribe(() => {
  
      this.loadTaches();
    });
  }
  
  
   
    showEditDialog(tache: Tache): void {
      // Affecter la tâche à éditer
      this.editingTache = tache;
      this.newTache = { ...tache };
  
      // Afficher le formulaire d'ajout/modification
      this.showAddForm = true;
    }
  

    openModifyDialog(tache: Tache): void {
      this.selectedTache = tache;
      this.dialogRef = this.dialog.open(ModifyTacheDialogComponent, {
        width: '400px',
        data: { tache: tache } // Utilisez la variable tache au lieu du type Tache
      });
    
      this.dialogRef.afterClosed().subscribe((result: Tache | undefined) => {
        if (result) {
          // Appeler la fonction de mise à jour de la tâche ici
          this.updateTache(result);
        }
        this.selectedTache = undefined;
      });
    }
    
  updateTache(updatedTache: Tache): void {
    this.tacheService.updateTache(updatedTache._id, updatedTache).subscribe(
      (response: any) => {
        console.log('Tâche mise à jour avec succès:', response);
        this.loadTaches(); // Rafraîchir la liste des tâches après la mise à jour
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la tâche:', error);
      }
    );
  }
  

    resetForm(): void {
      this.showAddForm = false;
      this.newTache = {_id:'', titre: '', description: '', etat: false, date: new Date(),userId: '', };
      this.editingTache = null; 
    }


    

    printTaskList(): void {
      // Ouvrir une nouvelle fenêtre pour l'impression
      const printWindow = window.open('', '_blank');
    
      if (printWindow) { // Vérifier si la fenêtre est non nulle
        // Construire le contenu HTML pour l'impression
        const printContent = `
          <html>
            <head>
              <title>Liste des Tâches</title>
              <style>
                /* Ajoutez ici vos styles d'impression */
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
    
                th, td {
                  border: 1px solid #ddd;
                  padding: 8px;
                  text-align: left;
                }
    
                th {
                  background-color: #f2f2f2;
                }
    
                .completed {
                  text-decoration: line-through;
                  color: #777;
                }
              </style>
            </head>
            <body>
              <h1>Liste des Tâches</h1>
              <table>
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>État</th>
                  </tr>
                </thead>
                <tbody>
                  ${this.generatePrintableRows()}
                </tbody>
              </table>
            </body>
          </html>
        `;
    
        // Écrire le contenu HTML dans la nouvelle fenêtre
        printWindow.document.write(printContent);
    
        // Fermer le document après l'impression
        printWindow.document.close();
    
        // Lancer le processus d'impression
        printWindow.print();
      } else {
        console.error("La fenêtre d'impression est null.");
      }
    }
    
    
    generatePrintableRows(): string {
      // Générer les lignes du tableau pour l'impression
      return this.taches.map(tache => `
        <tr>
          <td>${tache.titre}</td>
          <td>${tache.description}</td>
          <td>${this.formatDate(tache.date)}</td>
          <td class="${tache.etat ? 'completed' : ''}">${tache.etat ? 'Terminée' : 'En cours'}</td>
        </tr>
      `).join('');
    }

    formatDate(date: Date): string {
      const formattedDate = new Date(date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'numeric', day: 'numeric' });
      return formattedDate;
    }


    logout() {
      this.authService.logout(); 
        }
        
 

    sendEmail(to: string, html: string) {
      this.tacheService.sendEmail(to, html).subscribe(
        response => {
          console.log('Email sent successfully');
          alert('Email sent successfully');

        },
        error => {
          console.error('Failed to send email');
          alert('Failed to send email');
        }
      );
    }


    printTaskList2(): void {
      const allTasksCompleted = this.taches.every(tache => tache.etat);
      // Générer le tableau HTML pour la liste des tâches

      if (allTasksCompleted) {
      const htmlContent = `
      <html>
      <head>
        <title>Liste des Tâches</title>
        <style>
          /* Ajoutez ici vos styles d'impression */
          table {
            width: 100%;
            border-collapse: collapse;
          }

          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }

          th {
            background-color: #f2f2f2;
          }

          .completed {
            text-decoration: line-through;
            color: #777;
          }
        </style>
      </head>
      <body>
        <h1>Liste des Tâches</h1>
        <table>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Date</th>
              <th>État</th>
            </tr>
          </thead>
          <tbody>
            ${this.generatePrintableRows()}
          </tbody>
        </table>
      </body>
    </html>
      `;
  
      // Appeler la méthode d'envoi d'e-mail avec les données nécessaires
      this.sendEmail(this.recipientEmail, htmlContent);
    } else {
      // Afficher un message d'erreur si toutes les tâches ne sont pas terminées
      console.error("Toutes les tâches doivent être terminées pour envoyer la liste par e-mail.");
      alert("Toutes les tâches doivent être terminées pour envoyer la liste par e-mail.");
    }
    }

    
}
