import { Rendezvous } from './../../../../models/rendezvous';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RendezvousService } from './../../../services/rendezvous.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-rv',
  templateUrl: './edit-rv.component.html',
  styleUrls: ['./edit-rv.component.css']
})
export class EditRvComponent implements OnInit {
  editRv: FormGroup;
  currentRv = new Rendezvous();

  rendezvous;
  retrait;
  id?: number;
  enfant?: any;
  prenom?: any;
  daterv?: any;
  prenommere?: any
  nommere?: any
  numordre?: any
  libelleaction?: any;
  datenaissance?: any
  taille?: any;
  poid?: any;
  nom?: any;
  oeudeme?: any;
  poidstaille?: any;
  age?: any;
  pb?: any;
  milda?: any;
  iritrans?: any;
  tailleage?: any;
  poidsage?: any
  cherche;

  constructor(
    private rvService: RendezvousService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.cherche = 0;
    this.editRv = new FormGroup({
      id: new FormControl(''),
      numordre: new FormControl(''),
      prenom: new FormControl(''),
      nom: new FormControl(''),
      prenommere: new FormControl(''),
      nommere: new FormControl(''),
      libelleaction: new FormControl(''),
      datenaissance: new FormControl(''),
      daterv: new FormControl(''),
      taille: new FormControl(''),
      poid: new FormControl(''),
      age: new FormControl(''),
      oeudeme: new FormControl(''),
      poidstaille: new FormControl(''),
      tailleage: new FormControl(''),
      poidsage: new FormControl(''),
      pb: new FormControl(''),
      milda: new FormControl(''),

    });
    this.existe();
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.editRv.controls[controlName].hasError(errorName);
  }

  existe() {
    this.rvService.getRvById(this.activatedRoute.snapshot.params.id).subscribe(
      data => {
        console.log(this.retrait = data);
        if (data) {

          this.iritrans = (data.id);
          this.numordre = data.enfant.numordre;
          this.prenom = data.enfant.prenom;
          this.nom = data.enfant.nom;

          this.prenommere = data.enfant.prenommere;
          this.nommere = data.enfant.nommere;
          this.datenaissance = data.enfant.datenaissance;
          this.daterv = data.daterv;
          this.libelleaction = data.action.libelleaction;

          this.editRv.get('numordre').disable();
          this.editRv.get('prenom').disable();
          this.editRv.get('nom').disable();
          this.editRv.get('prenommere').disable();
          this.editRv.get('nommere').disable();
          this.editRv.get('datenaissance').disable();
          this.editRv.get('daterv').disable();
          this.editRv.get('libelleaction').disable();

          this.cherche = 0;

        }
      })
  }

  onSubmit() {
    if (this.cherche == 0) {
      let enregisrv = {

        id: this.iritrans,
        poid: this.editRv.value.poid,
        taille: this.editRv.value.taille,
        oeudeme: this.editRv.value.oeudeme,
        poidstaille: this.editRv.value.poidstaille,
        tailleage: this.editRv.value.tailleage,
        poidsage: this.editRv.value.poidsage,
        age: this.editRv.value.age,
        milda: this.editRv.value.milda,
        pb: this.editRv.value.pb,

      };

      this.rvService.putRendezvous(enregisrv).subscribe(
        data => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: ('Rendez-vous effectué avec success'),
            showConfirmButton: false,
            timer: 3000
          }),
            console.log(data);
          //localStorage.setItem("token",data.token);
          this.router.navigate(['admin/listRv']);
        },
        error => {
          console.log(error);
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: ('Rendez-vous déjà effectué'),
            showConfirmButton: false,
            timer: 3000
          }),
            alert(error);
        })
    }
  }

  onRedirect() {
    this.rvService.getListrv()
      .subscribe(
        () => {
          this.router.navigate(['admin/listRv']);
        });
  }
}