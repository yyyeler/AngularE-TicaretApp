import { Injectable } from '@angular/core';
import { User } from '../../login/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }
  private loggedIn = false;

  login(user : User) : boolean 
  {
    this.loggedIn = (user.username === "yyyeler" && user.password === "1111") ? true : false;
    localStorage.setItem("isLogged",user.username!);

    
    console.log( "loginStatus : " + this.loggedIn)
  
    return this.loggedIn;
  }

  isLoggedIn(){
    return this.loggedIn;
  }

  logOut()
  {
    localStorage.removeItem("isLogged");
    this.loggedIn = false;
    console.log( "loginStatus : " + this.loggedIn)
  }
}
