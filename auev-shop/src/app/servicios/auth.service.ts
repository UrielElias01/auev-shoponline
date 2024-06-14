import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:3001';

  constructor(private http:HttpClient) { }

  registerUser(usuario:User){
    console.log(usuario);
    return this.http.post(`${this.baseUrl}/users`, usuario);
  }

  getUserByEmail(email:string):Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users?email=${email}`);
  }
}
