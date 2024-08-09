import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap , catchError } from 'rxjs/operators';
import { Cart, User } from '../../data/user';
import { Product } from '../../data/product';

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

  getUser(id : string) : Observable<User> 
  { 
    
    let realPath = this.path + "/" +id;
    return this.http
      .get<User>(realPath)
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
    
    return this.http
      .post<User>(this.path,JSON.stringify(user))
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateUsersCart(user : User ,product : Product) : Observable<User>
  { 
    let realPath = this.path + "/" + user.id;
    return this.http.put<User>(realPath,user).pipe(
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