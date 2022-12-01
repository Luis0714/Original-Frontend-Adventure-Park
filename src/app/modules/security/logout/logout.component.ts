import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private LocalStorage:LocalStorageService,
    private router:Router) { }

  ngOnInit(): void {
    this.LocalStorage.RemoveUserData();
    document.location.reload();
    this.router.navigate(["/home"])
    
  }

}
