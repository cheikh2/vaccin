import { Action } from './../../models/action';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActionService {
  constructor(private httpClient: HttpClient) { }



  postAction(action){   
    return this.httpClient.post<Action>(`${environment.apiUrl}/api/actions`,action);
  }

  getAction(){ 
    return this.httpClient.get<Action>(`${environment.apiUrl}/api/actions`);
  }

  delete(id){
    return this.httpClient.delete<Action>(`${environment.apiUrl}/api/actions/${id}`);
   }
}
