import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap , catchError } from 'rxjs/operators';
import { User } from '../../data/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }
  protected path : string = "http://localhost:3000/users";

  getUsers() : Observable<User[]> 
  { 
    return this.http
      .get<User[]>(this.path)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  addUser(user : User) : Observable<User>
  { 
    const httpOptions = {
      headers : new HttpHeaders,
      'Content-Type':"application/json",
      'Authorization':'Token'
    }
    
    return this.http.post<User>(this.path,user,httpOptions).pipe(
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  protected handleError(err: HttpErrorResponse) 
  {
    let errorMessage = "";
    if(err.error instanceof ErrorEvent)
    {
      errorMessage = "Bir hata oluştu : "+err.error.message;
    }
    else
    {
      errorMessage = "Sistemsel bir hata oluştu.";
    }
    return  throwError(errorMessage);
  }
}