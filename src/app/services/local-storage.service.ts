import { Injectable } from '@angular/core';
import { LoggedUser } from '../models/logged-user.model';
import { UserModel } from '../models/user.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(private SecurityService: SecurityService) { }
  RemoveUserData(){
    localStorage.removeItem("user-data");
    let userData = new UserModel();
    this.SecurityService.UpdateUserBehavior(userData);
  }
  SaveUserData(data: LoggedUser):boolean {
    let JsonAsStrin = JSON.stringify(data);
    if (!localStorage.getItem("user-data")) {
      localStorage.setItem("user-data", JsonAsStrin);
      this.SecurityService.UpdateUserBehavior(data.User);
      return true;
    } else {
      return false;
    }
  }

  GetSesionData():LoggedUser | null{
    let userAsString = localStorage.getItem("user-data");
    if(userAsString){
      let userData: LoggedUser = JSON.parse(userAsString);
      return userData;
    }
    return null;
  }

  GetRolId():string{
    let userAsString = localStorage.getItem("user-data");
    if(userAsString){
      let userData: string = JSON.parse(userAsString).User.rol;
      return userData;
    }
    return '';
  }
}


