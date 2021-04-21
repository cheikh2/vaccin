import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EnfantService } from './../../../services/enfant.service';
import { ActionService } from './../../../services/action.service';
import { Router } from '@angular/router';
import { RendezvousService } from './../../../services/rendezvous.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-rv',
  templateUrl: './add-rv.component.html',
  styleUrls: ['./add-rv.component.css']
})
export class AddRvComponent implements OnInit {
  formaddrv: FormGroup; cherche; comptesnew: any; compte: any; irienf: any; comptesold: any; numordre: any;
  prenom: any; nom: any; enfant?: any; action?: any; daterv?: any; prenommere?: any; nommere?: any; numetatcivil?: any;
  datenaissance?: any; actions;

  constructor(private rvService: RendezvousService,
    private actionser: ActionService,
    private enfatser: EnfantService,
    private router: Router,
    public dialogRef: MatDialogRef<AddRvComponent>) { }

  ngOnInit(): void {
    this.formaddrv = new FormGroup({
      prenom: new FormControl(''),
      nom: new FormControl(''),
      numordre: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      datenaissance: new FormControl(''),
      prenommere: new FormControl(''),
      nommere: new FormControl(''),
      numetatcivil: new FormControl(''),
      daterv: new FormControl(new Date()),
      action: new FormControl('', [Validators.required])
    });

    this.cherche = 0;

    this.existe();
    this.actionser.getAction().subscribe(
      data => {
        this.actions = data["hydra:member"]
        console.log(data["hydra:member"]
        )
      },
      error => {
        alert('echec operation');
        console.log(error);
      }
    )
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formaddrv.controls[controlName].hasError(errorName);
  }

  existe() {
    this.formaddrv.get('numordre').valueChanges.subscribe(val => {

      this.enfatser.getenfrv(val).subscribe(
        data => {
          if (data["hydra:member"][0]) {
            this.irienf = (data["hydra:member"][0].id);
            this.nom = data["hydra:member"][0].nom;
            this.prenom = data["hydra:member"][0].prenom;
            this.nommere = data["hydra:member"][0].nommere;
            this.prenommere = data["hydra:member"][0].prenommere;
            this.numetatcivil = data["hydra:member"][0].numetatcivil;
            this.datenaissance = data["hydra:member"][0].datenaissance,

              this.formaddrv.get('nom').disable();
            this.formaddrv.get('prenom').disable();
            this.formaddrv.get('nommere').disable();
            this.formaddrv.get('prenommere').disable();
            this.formaddrv.get('numetatcivil').disable();
            this.formaddrv.get('datenaissance').disable();
            this.cherche = 0;

          } else {

            this.formaddrv.get('nom').enable();
            this.formaddrv.get('prenom').enable();
            this.formaddrv.get('nommere').enable();
            this.formaddrv.get('prenommere').enable();
            this.formaddrv.get('numetatcivil').enable();
            this.formaddrv.get('datenaissance').enable();

            this.nom = "";
            this.prenom = "";
            this.nommere = "";
            this.prenommere = "";
            this.numetatcivil = "";
            this.datenaissance = ""
          }
        })
    });
  }

  onCreate() {

    if (this.cherche == 0) {

      let comptesold = {
        "enfant": {
          id: this.irienf
        },
        "action": this.formaddrv.value.action,
        "daterv": this.formaddrv.value.daterv,
      }

      this.rvService.postRv(comptesold).subscribe(
        data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: (' Rendez-vous ajouté avec succès'),
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
            title: (' Programmation rendez-vous échouée'),
            showConfirmButton: false,
            timer: 3000
          }),
          console.log(error);
        }
      )
    }
  }
  onClose() {
    this.dialogRef.close();
  }
}
