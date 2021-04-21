import { AddTypeComponent } from './../add-type/add-type.component';
import { TypeService } from './../../../services/type.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-type',
  templateUrl: './list-type.component.html',
  styleUrls: ['./list-type.component.css']
})
export class ListTypeComponent implements OnInit {
  types;
  nbreType: any;
  page: number = 1;
  totalLength: any;
  constructor(private auth: TypeService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getType();
}

// Lister les types
getType(){
  this.auth.gettype().subscribe(
    data=>{
      this.types=data["hydra:member"];
      //this.totalLength = data.length;
      console.log(data["hydra:member"]);
      this.nbreType = data["hydra:member"].length;},
      error=>{
        alert('Veuillez vous authentifiez');
        console.log(error);
      }
  )
}

// Appel du popup
onCreate(): void {
  const dialogRef = this.dialog.open(AddTypeComponent, {
    width: '30%',
    data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    this.getType();
  });
}
// Supression de type
deleteType(id){
  let type=confirm("Etes vous sûre ?");
  if(!type) return;
  this.auth.delete(id).subscribe(() => {
      this.types=this.types.filter(type=>type.id != id)
  })
}
}
