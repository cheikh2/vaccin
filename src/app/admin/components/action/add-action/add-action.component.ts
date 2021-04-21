import { TypeService } from './../../../services/type.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActionService } from './../../../services/action.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-action',
  templateUrl: './add-action.component.html',
  styleUrls: ['./add-action.component.css']
})
export class AddActionComponent implements OnInit {
  formaddAction: FormGroup;
  types: any;
  constructor(private typeService: TypeService, private auth: ActionService, private router: Router,
    public dialogRef: MatDialogRef<AddActionComponent>) { }

  ngOnInit(): void {
    this.formaddAction = new FormGroup({
      libelleaction: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      type: new FormControl('', [Validators.required])
    });

    this.typeService.gettype().subscribe(
      data => {
        this.types = data["hydra:member"]
        console.log(data["hydra:member"]
        )
      },
      error => {
        console.log(error);
      }
    )
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formaddAction.controls[controlName].hasError(errorName);
  }

  onCreate() {

    console.log(this.formaddAction.value);
    let action = {
      libelleaction: this.formaddAction.value.libelleaction,
      type: this.formaddAction.value.type,
    };
    this.auth.postAction(action).subscribe(
      data => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: (' Action ajouté avec succès'),
          showConfirmButton: false,
          timer: 3000
        }),
        console.log(data);
        this.onClose();
      },
      error => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: (' Ajout échoué'),
          showConfirmButton: false,
          timer: 3000
        }),
        console.log(error);
      }
    )
  }

  onClose() {
    this.dialogRef.close();
  }
}
