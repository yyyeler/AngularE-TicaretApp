import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { User } from '../../data/user';
import { AllcountService, Count } from '../../services/allcount/allcount.service';
import { UserService } from '../../services/user/user.service';
import { MessageAlert } from '../../data/messageAlert';


@Component({
  selector: 'app-signin',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent implements OnInit {
protected model: User = new User();
protected errStatus = false;
protected message = new MessageAlert();
protected count : Count = new Count();

constructor(private allcountService : AllcountService,private userService : UserService){}

ngOnInit(): void {
  this.allcountService.getCount(1).subscribe(data => {
    this.count = data;
    this.model.id = this.count["count"]! + 1;
  });
}

signin(form: NgForm) 
{
  this.count["count"]!++;

  this.userService.addUser(this.model).subscribe(x => {
    this.message.class = "success";
    this.message.value = "Kullanıcı başarıyla eklendi";
  });
  
  this.allcountService.updateCount(this.count).subscribe();
}
  
}

