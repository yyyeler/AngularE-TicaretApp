import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ProductComponent } from "./pages/product/product.component";
import { NavComponent } from "./pages/nav/nav.component";
import { CategoryComponent } from './pages/category/category.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from './services/account/account.service';

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
  protected dropdownKey = false;

  constructor(private accountService : AccountService, private router : Router) {}

  ngOnInit(): void {
   this.fullname = localStorage.getItem("fullname")!;
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
