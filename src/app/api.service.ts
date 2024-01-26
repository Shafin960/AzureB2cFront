import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as $ from 'jquery';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7197/WeatherForecast';

  constructor(private http : HttpClient) { }

  getDataFromjQuery( accessToken: string){

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return $.ajax({
      url: this.apiUrl,
      method: 'GET',
      headers: headers,
      dataType: 'json',
    });
  }

  getData() {
    return this.http.get<any[]>(this.apiUrl);
  }
}
