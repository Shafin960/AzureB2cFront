import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MsalBroadcastService, MsalGuard, MsalInterceptor, MsalModule, MsalService} from '@azure/msal-angular';
import { PublicClientApplication, InteractionType , BrowserCacheLocation } from "@azure/msal-browser";
import { InterceptorService } from './interceptor.service';


const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MsalModule,
    MsalModule.forRoot( new PublicClientApplication({ // MSAL Configuration
      auth: {
          clientId: "c6f506bf-d156-4b42-a2d3-aeb84046d07e",
          authority: "https://sideriantest.b2clogin.com/sideriantest.onmicrosoft.com/B2C_1_sideriantest/",
          redirectUri: "http://localhost:4200/",
          knownAuthorities: ["sideriantest.b2clogin.com"],    
      },
      cache: {
          cacheLocation : BrowserCacheLocation.LocalStorage,
          storeAuthStateInCookie: isIE, // set to true for IE 11
      },
      system: {
          loggerOptions: {
              loggerCallback: () => {},
              piiLoggingEnabled: false
          }
      }
  }), {
      interactionType: InteractionType.Redirect, // MSAL Guard Configuration
  }, {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: new Map([
      ["https://localhost:7197/WeatherForecast", ["https://sideriantest.onmicrosoft.com/api/FullAccess"]] 
  ]),
  })
  ],
   providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: MsalInterceptor,
    multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
  bootstrap: [AppComponent ]
})
export class AppModule { }


// Tenant Name- sideriantest
// Doamin Name- sideriantest.onmicrosoft.com