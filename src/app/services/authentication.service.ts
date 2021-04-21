import { environment } from '../../environments/environment.prod';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';




@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(user:User) {
        return this.http.post<User>(`${environment.apiUrl}/login_check`, user)
            .pipe(tap(data => {
               // console.log(data);
                const decoded = jwt_decode(data.token);
                //console.log(decoded);  
                localStorage.setItem("token",data.token)            
                localStorage.setItem("user", JSON.stringify(user));
                localStorage.setItem('currentUser', JSON.stringify(data));
                this.currentUserSubject.next(data);
                //localStorage.setItem("roles", JSON.stringify(decoded.roles));
                //console.log(localStorage.getItem("roles"));
                return data;
                
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

}