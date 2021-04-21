import { Enfant } from '../../../../models/enfant';
import { EnfantService } from './../../../services/enfant.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-enfant',
  templateUrl: './add-enfant.component.html',
  styleUrls: ['./add-enfant.component.css']
})
export class AddEnfantComponent implements OnInit {
  addEnfant: FormGroup;
  enfant = new Enfant();

  steps = [
    { label: 'Confirm your name', content: 'Prenom, Nom.' },
    { label: 'Confirm your contact information', content: '123-456-7890' },
    { label: 'Confirm your address', content: '1600 Amphitheater Pkwy MTV' },
    { label: 'You are now done', content: 'Finished!' }
  ];

   /** Returns a FormArray with the name 'formArray'. */
  get formArray(): AbstractControl | null { return this.addEnfant.get('formArray'); }

  constructor(private fb: FormBuilder, 
    private enfantService: EnfantService, 
    private router: Router,
    public dialogRef: MatDialogRef<AddEnfantComponent>) { }

  ngOnInit() {
    this.enfantForm();
  }
  
  enfantForm (){
    this.addEnfant = this.fb.group({
      formArray: this.fb.array([
        this.fb.group({
          prenom: ['', [Validators.required, Validators.minLength(2)]],
          nom: ['', [Validators.required, Validators.minLength(2)]],
          sexe: ['', Validators.required],
          datenaissance: ['', Validators.required],
          adresse: ['', [Validators.required, Validators.minLength(2)]],
          numetatcivil: [''],
        }),
        this.fb.group({
          numordre: ['', [Validators.required, Validators.minLength(2)]],
          prenommere: ['', [Validators.required, Validators.minLength(2)]],
          nommere: ['', [Validators.required, Validators.minLength(2)]],
          telmere: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
          etatentree: ['', Validators.required],
          etatsortie: [''],
          prenomchefquartier: [''],
          prenombadienegokh: [''],
          nomchefquartier: [''],
          nombadienegokh: [''],
          telchefquartier: [''],
          telbadiennegokh: ['']
        }),
      ])
    });
  }

  onAddEnfant(){
    //console.log(this.formGroup.value);
    let enfant = {     
      prenom: this.addEnfant.value.formArray[0].prenom, nom: this.addEnfant.value.formArray[0].nom,
      sexe: this.addEnfant.value.formArray[0].sexe, datenaissance: this.addEnfant.value.formArray[0].datenaissance,
      adresse:this.addEnfant.value.formArray[0].adresse, numetatcivil:this.addEnfant.value.formArray[0].numetatcivil,
      numordre: this.addEnfant.value.formArray[1].numordre, prenommere: this.addEnfant.value.formArray[1].prenommere,
      nommere: this.addEnfant.value.formArray[1].nommere, telmere:this.addEnfant.value.formArray[1].telmere,    
      nomchefquartier: this.addEnfant.value.formArray[1].nomchefquartier, telchefquartier: this.addEnfant.value.formArray[1].telchefquartier,
      telbadiennegokh: this.addEnfant.value.formArray[1].telbadiennegokh,
      etatentree: this.addEnfant.value.formArray[1].etatentree, etatsortie: this.addEnfant.value.formArray[1].etatsortie,
      motifsortie: this.addEnfant.value.formArray[1].motifsortie, prenombadienegokh: this.addEnfant.value.formArray[1].prenombadienegokh,
      nombadienegokh: this.addEnfant.value.formArray[1].nombadienegokh, prenomchefquartier: this.addEnfant.value.formArray[1].prenomchefquartier      
    };
    
    this.enfantService.postEnfant(enfant).subscribe(
      data=>{
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: (this.addEnfant.value.formArray[0].prenom + ' a été ajouté avec succes'),
          showConfirmButton: false,
          timer: 3000
        }),
      console.log(data);
      this.onClose();
      },
      error=>{
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: (this.addEnfant.value.formArray[0].prenom + ' n\'a pas été ajouté'),
          showConfirmButton: false,
          timer: 3000
        }),
        console.log(error);
      }
    )
  }

  onClose(){
    this.dialogRef.close();
  }
}