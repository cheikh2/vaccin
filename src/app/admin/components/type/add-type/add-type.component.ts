import { TypeService } from './../../../services/type.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit {
  formaddType: FormGroup;
  constructor(private auth: TypeService, private router: Router,
    public dialogRef: MatDialogRef<AddTypeComponent>) { }

  ngOnInit(): void {
    this.formaddType = new FormGroup({
      libelletype: new FormControl('', [Validators.required, Validators.maxLength(60)])
    })
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formaddType.controls[controlName].hasError(errorName);
  }

  onCreate(){

    console.log(this.formaddType.value);
  let type ={
    libelletype:this.formaddType.value.libelletype
  };
  this.auth.postType(type).subscribe(
    data=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: (' Ajouté réussi avec succès'),
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
        title: (' Ajout Type échoué'),
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
