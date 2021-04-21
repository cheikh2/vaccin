import { TypeService } from './../../admin/services/type.service';
import { ActionService } from './../../admin/services/action.service';
import { RendezvousService } from './../../admin/services/rendezvous.service';
import { EnfantService } from './../../admin/services/enfant.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  adminForm: FormGroup;
  enfants: any;
  nbreEnfants: any;
  nbreRv: any;
  nbreAction: any;
  nbreType: any;
  searchEnfant: any;

  constructor(private FormBuilder: FormBuilder,
    private EnfantService: EnfantService,
    private rvService: RendezvousService,
    private actionService: ActionService,
    private typeService: TypeService) { }

  ngOnInit(): void {
    this.adminForm = this.FormBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.totalEnfants();
    this.totalRvs();
    this.totalAction();
    this.totalType();
  }

  totalEnfants(): void {
    this.EnfantService.getEnfant()
      .subscribe(
        data => {
          this.nbreEnfants = data["hydra:member"].length;
        },
      )
  }

  totalRvs(): void {
    this.rvService.getListrv()
      .subscribe(
        data => {
          this.nbreRv = data["hydra:member"].length;
        },
      )
  }

  totalAction(): void {
    this.actionService.getAction()
      .subscribe(
        data => {
          this.nbreAction = data["hydra:member"].length;
          //console.log(data["hydra:member"].length)
        },
      )
  }

  totalType() {
    this.typeService.gettype()
      .subscribe(
        data => {
          this.nbreType = data["hydra:member"].length;
        },
      )
  }

}
