import { Enfant } from './../../../../models/enfant';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EnfantService } from 'src/app/admin/services/enfant.service';

@Component({
  selector: 'app-detail-enfant',
  templateUrl: './detail-enfant.component.html',
  styleUrls: ['./detail-enfant.component.css']
})
export class DetailEnfantComponent implements OnInit {

  editEnfant: FormGroup;
  currentEnfant = new Enfant();

  constructor(
    private enfantService: EnfantService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.enfantService.getEnfantById(this.activatedRoute.snapshot.params.id).
      subscribe(enfant => { this.currentEnfant = enfant; });

  }

  onRedirect() {
    this.enfantService.getEnfant()
      .subscribe(
        () => {
          this.router.navigate(['admin/listEnfant']);
        });
  }
}
