import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AccountService } from '../services/account/account.service';
import { User } from './user';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
model: User = new User();


constructor(private accountService : AccountService){}

login(form: NgForm) 
{
  this.accountService.login(this.model);
}

}
