import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../data/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  protected user! : User;
  protected profilePhoto = "";
  protected toggleKey = false;

  constructor(private userService:UserService){}

  ngOnInit(): void {
    this.userService.getUser(localStorage.getItem("userId")!).subscribe(data => {
      this.user = data;
      this.profilePhoto = this.user.profileImage != "" ? this.user.profileImage! : 'images/default-profile-big.png';
    })
  }

  updateUser(form: NgForm) 
  {
    this.userService.updateUser(this.user).subscribe(data => 
    {
      this.toggleEdit();
    });
  }

  toggleEdit() 
  {
    this.toggleKey = !this.toggleKey;
  }
  
}
