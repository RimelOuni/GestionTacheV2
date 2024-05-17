import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { user } from 'src/app/classes/user';

@Component({
  selector: 'app-modify-employee-dialog',
  templateUrl: './modify-employee-dialog.component.html',
  styleUrls: ['./modify-employee-dialog.component.css']
})
export class ModifyEmployeeDialogComponent implements OnInit {

  modifyUserForm: FormGroup;

  constructor(
      public dialogRef: MatDialogRef<ModifyEmployeeDialogComponent>,
      private fb: FormBuilder,
      @Inject(MAT_DIALOG_DATA) public data: { user: user }
  ) {
      this.modifyUserForm = this.fb.group({
          nom: [data.user.nom, Validators.required],
          email: [data.user.email, [Validators.required, Validators.email]],
          motdepasse: [data.user.motdepasse, [Validators.required, Validators.minLength(8)]],
      });
  }

  onNoClick(): void {
      this.dialogRef.close();
  }

  onSaveClick(): void {
      if (this.modifyUserForm.valid) {
          const updatedUser: user = {
              _id: this.data.user._id,
              nom: this.modifyUserForm.value.nom,
              email: this.modifyUserForm.value.email,
              motdepasse: this.modifyUserForm.value.motdepasse,
              role: this.data.user.role,
              taches: this.data.user.taches
          };
          this.dialogRef.close(updatedUser);
      }
  }
  ngOnInit(): void {
  }

}
