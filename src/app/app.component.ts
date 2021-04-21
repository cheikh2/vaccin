import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    currentUser: User;
    roles:string[];
    private user: User

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x)
        
    }

    ngOnInit() {

        this.user = JSON.parse(localStorage.getItem("user"));
       // console.log(this.user);

        this.roles = JSON.parse(localStorage.getItem("roles"));
        //console.log(this.roles);
      } 
    
      isSuperAdmin(){
        if(this.roles[0] == "SUPERADMIN")return true;
      }
    
      isAdmin(){
        if(this.roles[0] == "ADMIN")return true;
      }
    
      isCaissier(){
        if(this.roles[0] == "CAISSIER")return true;
      }
    
      isParAdmin(){
        if(this.roles[0] == "PARTENAIRE" || this.roles[0] == "ADMIN_PARTENAIRE")return true;
      }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    
}

