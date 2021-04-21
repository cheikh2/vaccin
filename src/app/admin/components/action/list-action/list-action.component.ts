import { MatDialog } from '@angular/material/dialog';
import { AddActionComponent } from './../add-action/add-action.component';
import { ActionService } from './../../../services/action.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-action',
  templateUrl: './list-action.component.html',
  styleUrls: ['./list-action.component.css']
})
export class ListActionComponent implements OnInit {
  actions;
  nbreAction: any;
  page: number = 1;
  totalLength: any;
  constructor(private auth: ActionService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAction();
  }

  getAction(){
    this.auth.getAction().subscribe(
      data => {
        this.actions = data["hydra:member"];
        //this.totalLength = data.length;
        console.log(data["hydra:member"]);
        this.nbreAction = data["hydra:member"].length;
      },
      error => {
        alert('Veuillez vous authentifiez');
        console.log(error);
      }
    )
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(AddActionComponent, {
      width: '30%',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.getAction();
    });
  }

// Supression action
deleteAction(id){
  let action=confirm("Etes vous sûre ?");
  if(!action) return;
  this.auth.delete(id).subscribe(() => {
      this.actions=this.actions.filter(action=>action.id != id)
  })
}
  
}
