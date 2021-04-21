import { environment } from './../../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Enfant } from '../../models/enfant';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class EnfantService {


  constructor(private httpClient: HttpClient) { }

  postEnfant(enfant: Enfant) {
    return this.httpClient.post<Enfant>(`${environment.apiUrl}/api/enfants`, enfant);
  }

  getEnfant(): Observable<any> {
    return this.httpClient.get<Enfant[]>(`${environment.apiUrl}/api/enfants`);
  }

  getEnfantById(id: number): Observable<Enfant> {
    return this.httpClient.get<Enfant>(`${environment.apiUrl}/api/enfants/${id}`);
  }

  putEnfant(enfant: Enfant): Observable<Enfant> {
    return this.httpClient.put<Enfant>(`${environment.apiUrl}/api/enfants/${enfant.id}`, enfant);
  }

  getenfrv(numordre): Observable<Enfant> {
    return this.httpClient.get<Enfant>(`${environment.apiUrl}/api/enfants?numordre=${numordre}`);
  }


}
