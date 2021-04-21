import { AddRvComponent } from './../add-rv/add-rv.component';
import { MatDialog } from '@angular/material/dialog';
import { RendezvousService } from './../../../services/rendezvous.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-rv',
  templateUrl: './list-rv.component.html',
  styleUrls: ['./list-rv.component.css']
})
export class ListRvComponent implements OnInit {
  rvs: any;
  nbreRv: any;
  searchRv: any;
  totalLength: any;
  page: number = 1;

  constructor(private rvService: RendezvousService, 
    private dialog: MatDialog) { }

  ngOnInit(): void {
    this.readRvs();
  }

  readRvs(): void {
    this.rvService.getListrv()
      .subscribe(
        data => {
          this.rvs = data["hydra:member"];
          //this.totalLength = data.length;
          console.log(data["hydra:member"]);
          
          this.nbreRv = data["hydra:member"].length;
        },
        error => {
          //alert('Veuillez vous authentifiez');
          console.log(error);
        }
      )
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(AddRvComponent, {
      width: '50%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.readRvs();
    });
  }
}
