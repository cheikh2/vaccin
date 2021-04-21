import { Type } from './../../models/type';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  constructor(private httpClient: HttpClient) { }

  postType(type){
    return this.httpClient.post<Type>(`${environment.apiUrl}/api/types`,type);
  }

  gettype(){
    return this.httpClient.get<Type>(`${environment.apiUrl}/api/types`);
  }

  delete(id){
    return this.httpClient.delete<Type>(`${environment.apiUrl}/api/types/${id}`);
   }
}
