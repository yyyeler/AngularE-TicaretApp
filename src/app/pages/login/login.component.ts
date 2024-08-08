import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AccountService } from '../../services/account/account.service';
import { User } from '../../data/user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
model: User = new User();
protected errStatus = false; 

constructor(private accountService : AccountService, private router : Router)
{}

login(form: NgForm) 
{
  if(this.accountService.login(this.model)) 
    this.router.navigateByUrl("/products");
  else
    this.errStatus = true;
}

}
