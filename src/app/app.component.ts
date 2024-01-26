import { Component } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { ApiService } from './api.service';
import { Weather } from './model/weather';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'demob2c';
  accessTokenHere = false;
  weatherData: Weather[] = [];
  weatherDatabyJquery: Weather[]=[];
  constructor(
    private authService: MsalService,
    private apiService: ApiService
  ) {}

  signInAjax(){
    this.authService
      .loginPopup({
        scopes: ['https://sideriantest.onmicrosoft.com/api/FullAccess'],
      })
      .subscribe(
        (response) => {
          const accesstoken = response.accessToken;
          this.accessTokenHere = true;
          
          console.log(response);

          this.apiService.getDataFromjQuery(accesstoken).then(
            (data) => {
              this.weatherDatabyJquery = data;
              console.log('API Data:', data);
            },
            (error) => {
              console.error('API Request Error:', error);
            }
          );
        },
        (error) => {
          
          console.error('Login failed:', error);
        }
      );
  }

  signIn() {
    this.authService
      .loginPopup({
        scopes: ['https://sideriantest.onmicrosoft.com/api/FullAccess'],
      })
      .subscribe(
        (response) => {
          const accesstoken = response.accessToken;
          localStorage.setItem("authToken", accesstoken);
          this.accessTokenHere = true;
          
          console.log(response);
          this.apiService.getData().subscribe(
            (data) => {
              this.weatherData = data;
              
            },
            (error) => {
              console.error('API Request Error:', error);
            }
          );
        },
        (error) => {
          
          console.error('Login failed:', error);
        }
      );
  }

  logout() {
    localStorage.removeItem('authToken');
    this.authService.logoutPopup({
        mainWindowRedirectUri: "/"
    });
}
}
