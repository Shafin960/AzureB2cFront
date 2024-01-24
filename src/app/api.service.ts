import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://localhost:7197/WeatherForecast';

  constructor(private http : HttpClient) { }

  getData(accessToken: string) {
    // Include access token in the Authorization header
    const headers = new HttpHeaders({
      Authorization: `Bearer ${accessToken}`,
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }
}
