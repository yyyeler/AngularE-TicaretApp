import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Product } from '../../product/product';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { tap , catchError } from 'rxjs/operators';

@Injectable()
export class ProductService {

  constructor(private http : HttpClient) { }
  protected path : string = "http://localhost:3000/products";

  getProducts(categoryId : string) : Observable<Product[]> 
  { 
    let realPath = this.path;
    realPath += categoryId?"?categoryId="+categoryId:"";
    return this.http
      .get<Product[]>(realPath)
      .pipe(
        tap(data => console.log(JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  addProduct(product : Product) : Observable<Product>
  { 
    const httpOptions = {
      headers : new HttpHeaders,
      'Content-Type':"application/json",
      'Authorization':'Token'
    }
    
    return this.http.post<Product>(this.path,product,httpOptions).pipe(
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
