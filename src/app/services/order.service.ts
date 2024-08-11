import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap , catchError } from 'rxjs/operators';
import { Order } from '../data/order';

@Injectable()
export class OrderService {

  constructor(private http : HttpClient) { }
  protected path : string = "http://localhost:3000/orders";

  getOrders(urlExtension? : string) : Observable<Order[]> 
  { 
    let realPath = this.path;
    realPath += urlExtension?urlExtension:"";
    return this.http
      .get<Order[]>(realPath)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  addOrder(order : Order) : Observable<Order>
  { 
    const httpOptions = {
      headers : new HttpHeaders,
      'Content-Type':"application/json",
      'Authorization':'Token'
    }
    
    return this.http.post<Order>(this.path,order,httpOptions).pipe(
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
