import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/classes/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  
  isEditMode: boolean = false;

  session!: user;
  userId: any = localStorage.getItem('userId');
  nom:any;
  email:any;
  motdepasse: any = '';
  role: any = '';
  taches: any[] = [];

  constructor(private userService: UserService, private authService:AuthService) {
    this.nom=localStorage.getItem('nom');
    this.email=localStorage.getItem('email');
    
  }

  ngOnInit(): void {
    this.loadUserProfile();
  }


  logout() {
    this.authService.logout(); 
      }



  loadUserProfile() {
    const userId: any = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUserById(userId).subscribe(
        (user: user) => {
          this.session = user;
          this.motdepasse = user.motdepasse; // Initialiser motdepasse avec la valeur du user
          this.role = user.role; // Initialiser role avec la valeur du user
          this.taches = user.taches; // Initialiser taches avec la valeur du user
        },
        (error) => {
          console.error('Error loading user profile:', error);
        }
      );
    }
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  updateProfile() {
    if (this.userId && this.nom && this.email) {
      const profileData: user = {
        _id: this.userId,
        nom: this.nom,
        email: this.email,
        motdepasse: this.motdepasse,
        role:this.role,
        taches:this.taches
      };

      this.userService.updateProfile(this.userId,profileData).subscribe(
        (updatedUser: user) => {
          // Traiter la réponse si nécessaire
          this.toggleEditMode();
        },
        (error) => {
          console.error('Error updating user profile:', error);
        }
      );
    } else {
      console.error('Some user profile data is missing.');
    }
  }
  updateEmployee(updatedUser: user): void {
    this.userService.updateEmployee(updatedUser, this.userId).subscribe(
        (response: any) => {
            console.log('Profil updated successfully:', response);
            this.toggleEditMode(); // Rafraîchir la liste des utilisateurs après la mise à jour
        },
        (error) => {
            console.error('Error updating profil:', error);
        }
    );
  }
}
