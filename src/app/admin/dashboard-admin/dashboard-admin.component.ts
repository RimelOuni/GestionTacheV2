import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { user } from 'src/app/classes/user';
import { UserService } from 'src/app/services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ModifyEmployeeDialogComponent } from '../modify-employee-dialog/modify-employee-dialog.component';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  users: user[] = [];
  newUserForm!: FormGroup;
  newUser: user = { _id:'', nom: '', email: '', motdepasse: '', role: '',taches:[] };
  showAddUserCard: boolean = false;
  isEditing: boolean = false;
  selectedUser: user | undefined;
  dialogRef: any;
  modifyUserForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private dialog: MatDialog) { }

  toggleAddUserCard(): void {
    this.showAddUserCard = !this.showAddUserCard;
}
resetForm(): void {
  this.showAddUserCard = false;
  this. newUser= { _id:'', nom: '', email: '', motdepasse: '', role: '',taches:[] };
}
  ngOnInit(): void {
    this.newUserForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motdepasse: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.modifyUserForm = this.fb.group({
      nom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motdepasse: ['', [Validators.required, Validators.minLength(8)]],
    });

    this.getAllUsers();
  }
  validate_email() {
    return (
      this.newUserForm.get('email')?.invalid &&
      this.newUserForm.controls['email'].touched
    );
  }

  validate_password() {
    return (
      this.newUserForm.get('motdepasse')?.invalid &&
      this.newUserForm.controls['motdepasse'].touched
    );
  }
  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      (response: any) => {
        this.users = response.users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  addEmployee() {
    // Vérifiez si le formulaire est valide avant d'ajouter un employé
    if (this.newUserForm.valid) {
      this.userService.addEmployee(this.newUserForm.value).subscribe(
        (response: any) => {
          console.log('Employee added successfully:', response);
  
          // Réinitialiser le formulaire après l'ajout
          this.newUserForm.reset();
  
          this.getAllUsers();
        },
        (error) => {
          console.error('Error adding employee:', error);
        }
      );
    }
  }
  
/*
  updateEmployee(updatedUser: user) {
    this.userService.updateEmployee(updatedUser, updatedUser._id).subscribe(
      (response: any) => {
        console.log('Employee updated successfully:', response);
        this.getAllUsers(); // Refresh the user list after updating
      },
      (error) => {
        console.error('Error updating employee:', error);
      }
    );
  } */


  deleteEmployee(userId: string) {
    this.userService.deleteEmployee(userId).subscribe(
      (response: any) => {
        console.log('Employee deleted successfully:', response);
        this.getAllUsers(); // Refresh the user list after deleting
      },
      (error) => {
        console.error('Error deleting employee:', error);
      }
    );
  }

  openModifyDialog(user: user): void {
    this.selectedUser = user;
    this.dialogRef = this.dialog.open(ModifyEmployeeDialogComponent, {
        width: '400px',
        data: { user: user }
    });

    this.dialogRef.afterClosed().subscribe((result: user | undefined) => {
        if (result) {
            // Appeler la fonction de mise à jour de l'employé ici
            this.updateEmployee(result);
        }
        this.selectedUser = undefined;
    });
}
updateEmployee(updatedUser: user): void {
  this.userService.updateEmployee(updatedUser, updatedUser._id).subscribe(
      (response: any) => {
          console.log('Employee updated successfully:', response);
          this.getAllUsers(); // Rafraîchir la liste des utilisateurs après la mise à jour
      },
      (error) => {
          console.error('Error updating employee:', error);
      }
  );
}


}
  


