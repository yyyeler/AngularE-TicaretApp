import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap , catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AllcountService {

  constructor(private http : HttpClient) { }
  protected path : string = "http://localhost:3000/allcounts";

  getAllcounts() : Observable<Count[]> 
  { 
    return this.http
      .get<Count[]>(this.path)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  getCount(id : number) : Observable<Count> 
  { 
    let realPath = this.path + "/" + id;
    return this.http
      .get<Count>(realPath)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  updateCount(count : Count)
  {
    let realPath = this.path + "/" + count.id;
    return this.http
      .put<Count>(realPath,JSON.stringify(count))
      .pipe(
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

export class Count 
{
  id? : number;
  count? : number;
}