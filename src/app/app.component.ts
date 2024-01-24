import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demob2c';
  constructor( private authService: MsalService ){}
  
  signIn(){
    this.authService.loginPopup({
      scopes: ['https://sideriantest.onmicrosoft.com/api/FullAccess'],
    })
      .subscribe((response) => {
        // Handle successful login
        console.log( response);
      }, (error) => {
        // Handle login error
        console.error('Login failed:', error);
      });  
  }
  
}
