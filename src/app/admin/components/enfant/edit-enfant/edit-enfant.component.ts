import { Enfant } from './../../../../models/enfant';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EnfantService } from 'src/app/admin/services/enfant.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-enfant',
  templateUrl: './edit-enfant.component.html',
  styleUrls: ['./edit-enfant.component.css']
})
export class EditEnfantComponent implements OnInit {
  editEnfant: FormGroup;
  currentEnfant = new Enfant();

  constructor(
    private enfantService: EnfantService,
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.enfantService.getEnfantById(this.activatedRoute.snapshot.params.id).
      subscribe(enfant => { this.currentEnfant = enfant; });

  }

  onEditEnfant() {
    this.enfantService.putEnfant(this.currentEnfant)
      .subscribe(
        () => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: (this.currentEnfant.prenom + ' ' + this.currentEnfant.nom + ' na été modifié avec succès'),
            showConfirmButton: false,
            timer: 3000
          }),
          this.router.navigate(['admin/listEnfant']);
        },
        error => {
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: (this.currentEnfant.prenom + ' ' + this.currentEnfant.nom + ' n\'a pas été modifié avec succès'),
            showConfirmButton: false,
            timer: 3000
          })
          console.log(error);

        });
  }

  onRedirect() {
    this.enfantService.getEnfant()
      .subscribe(
        () => {
          this.router.navigate(['admin/listEnfant']);
        });
  }

}
