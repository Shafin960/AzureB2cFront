import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { ApiService } from './api.service';
import { Weather } from './model/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'demob2c';
  accessTokenHere=false;
  weatherData : Weather[]=[];
  constructor( private authService: MsalService , private apiService: ApiService){}
  
  signIn(){
    this.authService.loginPopup({
      scopes: ['https://sideriantest.onmicrosoft.com/api/FullAccess'],
    })
      .subscribe((response) => {
        const accesstoken= response.accessToken;
        this.accessTokenHere=true;
        // Handle successful login
        console.log( response);
        this.apiService.getData(accesstoken).subscribe(
          (data) => {
            this.weatherData=data;
            //console.log('API Data:', data);
          },
          (error) => {
            
            console.error('API Request Error:', error);
          }
        );

      }, (error) => {
        // Handle login error
        console.error('Login failed:', error);
      });  
  }
  
}
