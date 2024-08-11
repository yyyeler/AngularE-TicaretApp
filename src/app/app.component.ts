import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductComponent } from "./pages/product/product.component";
import { NavComponent } from "./pages/nav/nav.component";
import { CategoryComponent } from './pages/category/category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from './services/account/account.service';
import { UserService } from './services/user/user.service';
import { User } from './data/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductComponent, NavComponent,CategoryComponent, RouterLink, ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  protected title = 'E-Ticaret App';
  protected fullname? : string; 
  protected profilePhoto? : string; 
  protected user! : User;
  protected dropdownKey = false;

  constructor(private accountService : AccountService, private userService: UserService, private router : Router) {}

  ngOnInit(): void {
   this.userService.getUser(localStorage.getItem("userId")!).subscribe(data => {
    this.user = data;
    this.fullname = this.user.name+" "+this.user.surname;
    this.profilePhoto = this.user.profileImage != "" ? this.user.profileImage! : 'images/default-profile-big.png';
    console.log(this.user);
   });
  }

  isLoggedIn() {
    return this.accountService.isLoggedIn();
  }

  logOut()
  {
    this.dropdownKey=false;
    this.accountService.logOut();
    this.router.navigateByUrl("/login");
  }

  dropdownToggle()
  {
    this.dropdownKey = !this.dropdownKey;
  }
}
