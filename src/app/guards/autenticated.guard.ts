import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticatedGuard implements CanActivate {
  constructor(private LocalStorage: LocalStorageService,
    private SecuritySevice:SecurityService,
    private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let sesioData = this.LocalStorage.GetSesionData();
    if(sesioData){
        return this.SecuritySevice.CheckSesionToken(sesioData?.Token);
    }else{
      this.router.navigate(['/home']);
      return false;
    }
  }
  
}
