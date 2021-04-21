import { AddTypeComponent } from './admin/components/type/add-type/add-type.component';
import { ListTypeComponent } from './admin/components/type/list-type/list-type.component';
import { AddActionComponent } from './admin/components/action/add-action/add-action.component';
import { ListActionComponent } from './admin/components/action/list-action/list-action.component';
import { DetailRvComponent } from './admin/components/rv/detail-rv/detail-rv.component';
import { DetailEnfantComponent } from './admin/components/enfant/detail-enfant/detail-enfant.component';
import { EditRvComponent } from './admin/components/rv/edit-rv/edit-rv.component';
import { EditEnfantComponent } from './admin/components/enfant/edit-enfant/edit-enfant.component';
import { ListRvComponent } from './admin/components/rv/list-rv/list-rv.component';
import { AddRvComponent } from './admin/components/rv/add-rv/add-rv.component';
import { ListEnfantComponent } from './admin/components/enfant/list-enfant/list-enfant.component';
import { AddEnfantComponent } from './admin/components/enfant/add-enfant/add-enfant.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: "", component : LoginComponent},
  {path: "admin", component : AdminComponent,
  children:[
    { path: "addEnfant", component : AddEnfantComponent },
    { path: "listEnfant", component : ListEnfantComponent },
    { path: "editEnfant/:id", component : EditEnfantComponent },
    { path: "detailEnfant/:id", component : DetailEnfantComponent },
    { path: "addRv", component : AddRvComponent },
    { path: "editRv/:id", component : EditRvComponent },
    { path: "listRv", component : ListRvComponent },
    { path: "detailRv/:id", component : DetailRvComponent },
    { path: "listAction", component : ListActionComponent },
    { path: "addAction", component : AddActionComponent },
    { path: "listType", component : ListTypeComponent },
    { path: "addType", component : AddTypeComponent },
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
