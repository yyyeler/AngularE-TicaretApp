import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductComponent } from "./product/product.component";
import { NavComponent } from "./nav/nav.component";
import { CategoryComponent } from './category/category.component';
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
export class AppComponent {
  title = 'shop';
  constructor(private accountService : AccountService){}

  isLoggedIn() {
    return this.accountService.isLoggedIn();
  }

  logOut()
  {
    this.accountService.logOut();
  }
}
