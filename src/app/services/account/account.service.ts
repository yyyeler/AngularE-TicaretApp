import { Injectable } from '@angular/core';
import { User } from '../../login/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor() { }
  loggedIn = false;

  login(user : User) : boolean 
  {
    this.loggedIn = (user.userName === "yyyeler" && user.password === "1111") ? true : false;
    localStorage.setItem("isLogged",user.userName!);
  
    return this.loggedIn;
  }

  isLoggedIn(){
    return this.loggedIn;
  }

  logOut()
  {
    localStorage.removeItem("isLogged");
    this.loggedIn = false;
  }
}
