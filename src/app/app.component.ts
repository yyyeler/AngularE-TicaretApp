import { Component } from '@angular/core';
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
export class AppComponent {
  title = 'E-Ticaret App';

  constructor(private accountService : AccountService, private router : Router) {}

  isLoggedIn() {
    return this.accountService.isLoggedIn();
  }

  logOut()
  {
    this.accountService.logOut();
    this.router.navigateByUrl("/login");
  }
}
