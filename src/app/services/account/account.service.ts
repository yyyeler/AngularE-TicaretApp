import { Injectable } from '@angular/core';
import { User } from '../../data/user';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
  private loggedIn = false;
  private userList : User[] = [];

  constructor(private userService : UserService) 
  {
    this.userService.getUsers().subscribe(data => {
      this.userList = data;
    });
  }

  login(user : User) : boolean 
  {

    

    this.userList.forEach(x => {
      if(x.username === user.username && x.password === user.password)
      {
        this.loggedIn = true;
        localStorage.setItem("isLogged",user.username!);
      } 
    })

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
