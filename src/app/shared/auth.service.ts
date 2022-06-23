import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  endpoint: string = 'http://localhost:3080';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(private http: HttpClient, public router: Router) {}

  // Sign-up
  signUp(user: User): Observable<any> {
    let api = `${this.endpoint}/signup`;
    return this.http.post(api, user).pipe(catchError(x=> this.handleError(x)));
  }

  // Sign-in
  signIn(user: User) {
    return this.http
      .post<any>(`${this.endpoint}/login`, user).pipe(catchError(x=> this.handleError(x)))
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return authToken !== null ? true : false;
  }

  doLogout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }
  }

  
  getProducts(): Observable<any> {
    let api = `${this.endpoint}/products`;
    const token = this.getToken()
    this.headers.append('Authorization', `Bearer ${token}`)
    return this.http.get(api, { headers: this.headers }).pipe(catchError(x=> this.handleError(x)));
  }

  addProduct(): Observable<any> {
    let api = `${this.endpoint}/products`;
    const token = this.getToken()
    this.headers.append('Authorization', `Bearer ${token}`)
    return this.http.post(api, { headers: this.headers }).pipe(catchError(x=> this.handleError(x)));
  }

  updateProduct(): Observable<any> {
    let api = `${this.endpoint}/products`;
    const token = this.getToken()
    this.headers.append('Authorization', `Bearer ${token}`)
    return this.http.put(api, { headers: this.headers }).pipe(catchError(x=> this.handleError(x)));
  }

  deleteProduct(): Observable<any> {
    let api = `${this.endpoint}/products`;
    const token = this.getToken()
    this.headers.append('Authorization', `Bearer ${token}`)
    return this.http.delete(api, { headers: this.headers }).pipe(catchError(x=> this.handleError(x)));
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return of(error.error);
  }
}
