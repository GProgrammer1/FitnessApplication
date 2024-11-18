import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomResponse, Trainee } from '../models/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '../env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient){}

  apiUrl = `${environment}/auth` ;
  login(credentials: { email: string; password: string; }) : Observable<CustomResponse<{token: string}>> {

    return this.http.post<CustomResponse<{token: string}>>(`${this.apiUrl}/authenticate`, credentials);
    
  }

  register(trainee : Trainee) : Observable<CustomResponse<{token: string}>> {
    return this.http.post<CustomResponse<{token: string}>>(`${this.apiUrl}/register`, trainee);
    
  }
  

  
}
