import { Rendezvous } from './../../models/rendezvous';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RendezvousService {
  constructor(private httpClient: HttpClient) { }


  postRv(rv: Rendezvous){
    return this.httpClient.post<Rendezvous>(`${environment.apiUrl}/api/rendezvouses`, rv);
  }

   //get la liste des rv
   getListrv(): Observable<any>{  
    return this.httpClient.get<Rendezvous>(`${environment.apiUrl}/api/rendezvouses`);
  }

  getRvById(id: number): Observable<Rendezvous> {
    return this.httpClient.get<Rendezvous>(`${environment.apiUrl}/api/rendezvouses/${id}`);
  }

  putRendezvous(rendousvous:Rendezvous): Observable<Rendezvous> {
    return this.httpClient.put<Rendezvous>(`${environment.apiUrl}/api/rendezvouses/${rendousvous.id}`, rendousvous);
  }
  
}
