import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Tache } from 'src/app/classes/tache';

@Component({
  selector: 'app-modify-tache-dialog',
  templateUrl: './modify-tache-dialog.component.html',
  styleUrls: ['./modify-tache-dialog.component.css']
})
export class ModifyTacheDialogComponent implements OnInit {
  modifyTacheForm: FormGroup;
  today: string | undefined;
  constructor(
    public dialogRef: MatDialogRef<ModifyTacheDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { tache : Tache}
) {
  this.today = new Date().toISOString().split('T')[0];

    this.modifyTacheForm = this.fb.group({
      titre: [data.tache.titre, Validators.required],
      description: [data.tache.description, [Validators.required]],
      date: [data.tache.date, [Validators.required]],
    });
}

onNoClick(): void {
    this.dialogRef.close();
}

onSaveClick(): void {
    if (this.modifyTacheForm.valid) {
        const updatedTache: Tache = {
            _id: this.data.tache._id,
            titre: this.modifyTacheForm.value.titre,
            description: this.modifyTacheForm.value.description,
            date: this.modifyTacheForm.value.date,
            etat: this.data.tache.etat,
            userId:this.data.tache.userId,
        };
        this.dialogRef.close(updatedTache);
    }
}
ngOnInit(): void {
}

}
