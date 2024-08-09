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
        this.setUserInfo(x.id!,(x.name+" "+x.surname),x.username!);
      } 
    })
    return this.loggedIn;
  }

  isLoggedIn(){
    return this.loggedIn;
  }

  logOut()
  {
    this.deleteUserInfo();
    this.loggedIn = false;
  }

  setUserInfo(userid : number , fullname : string, username : string)
  {
    localStorage.setItem("userId",userid+""!);
    localStorage.setItem("fullname",fullname!);
    localStorage.setItem("isLogged",username!);
  }

  deleteUserInfo()
  {
    localStorage.removeItem("userId");
    localStorage.removeItem("fullname");
    localStorage.removeItem("isLogged");
  }
}
