import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isLogged: boolean = false;
  constructor(private SecuritySevice: SecurityService) { }

  ngOnInit(): void {
    this.SecuritySevice.GetUserData().subscribe({
      next:(data:UserModel)=>{
        this.isLogged = data.isLogged;
      },
      error: (err) =>{

      }
    })
  }

}
