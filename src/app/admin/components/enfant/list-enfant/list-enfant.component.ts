import { Router } from '@angular/router';
import { EnfantService } from './../../../services/enfant.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddEnfantComponent } from '../add-enfant/add-enfant.component';

@Component({
  selector: 'app-list-enfant',
  templateUrl: './list-enfant.component.html',
  styleUrls: ['./list-enfant.component.css']
})
export class ListEnfantComponent implements OnInit {
  enfants: any;
  nbreEnfants: any;
  searchEnfant: any;

  constructor(private EnfantService: EnfantService, 
    private router: Router,
    private dialog: MatDialog) { }

  totalLength: any;
  page: number = 1;

  ngOnInit(): void {
    this.readEnfants();
  }

  readEnfants(): void {
    this.EnfantService.getEnfant()
      .subscribe(
        data => {
          this.enfants = data["hydra:member"];
          this.totalLength = data.length;
          console.log(data["hydra:member"]);
          
          this.nbreEnfants = data["hydra:member"].length;
        },
        error => {
          //alert('Veuillez vous authentifiez');
          console.log(error);
        }
      )
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(AddEnfantComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.readEnfants();
    });
  }
}
