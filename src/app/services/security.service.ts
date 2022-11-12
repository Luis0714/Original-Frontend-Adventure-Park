import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApisInfo } from '../config/apisInfo';
import { LoggedUser } from '../models/logged-user.model';
import { UserModel } from '../models/user.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  userData = new BehaviorSubject<UserModel>(new UserModel);
  urlMsSeG: string = ApisInfo.MS_SEG_URL;
 
  constructor(
    private http:HttpClient,
   // private LocalStorage:LocalStorageService
  ) { 
    this.SesionValidation();
  }
  /**
   * Se verifica la existencia de una sesion activa anteriormente
   */
  SesionValidation(){
    let userAsString = localStorage.getItem("user-data");
    if(userAsString){
      let userData: LoggedUser = JSON.parse(userAsString);
      this.UpdateUserBehavior(userData.User);
    }
  }
  /**
   * Actualiza los datos del nuevo usuario logueado
   * @param data nueva informacion
   * @returns el estado del user data
   */
  UpdateUserBehavior(data: UserModel){
    return this.userData.next(data);
  }
  /**
   * Retorna la informacion del usuario que este en sesion
   * @returns la info de user logueado
   */
  GetUserData(){
    return this.userData.asObservable();
  }

  ForgotPasswordRequest(userName: string):Observable<boolean> {
    let actionName = "recuperar-clave";
     return this.http.post<boolean>(`${this.urlMsSeG}/${actionName}`,{
      Usuario:userName
    });
  }

  LoginRequest(userName: string, password: string):Observable<boolean> {
    let actionName = "login";
     return this.http.post<boolean>(`${this.urlMsSeG}/${actionName}`,{
      correo:userName,
      clave:password
    });
  }

  VerifyCodeRequest(code:number):Observable<LoggedUser>{
    let actionName = "validar-codigo";
    return this.http.get<LoggedUser>(`${this.urlMsSeG}/${actionName}/${code}`);
  }
  /**
   * Valida si el token es correcto
   * @param jwt jwt
   * @returns string
   */
  CheckSesionToken(jwt:string):Observable<boolean>{
    let actionName = "check-sesion-token";
    return this.http.get<boolean>(`${this.urlMsSeG}/${actionName}/${jwt}`);
  }
}
