import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApisInfo } from '../config/apisInfo';
import { LoggedUser } from '../models/logged-user.model';
import { UserModel } from '../models/user.model';
import { UserModelRegister} from '../models/register-user.models';
import { LocalStorageService } from './local-storage.service';
import { RolModel } from '../models/rol.model';
import { cityModel } from '../models/city.model';
import { cityModel3 } from '../models/city.model3';



@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  userData = new BehaviorSubject<UserModel>(new UserModel);
  urlMsSeG: string = ApisInfo.MS_SEG_URL;
  rol_id: string = ApisInfo.ROL_ID;
  registerData = new BehaviorSubject<UserModelRegister>(new UserModelRegister)
 
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
  /**
   * hace la solicitud de cambio de contraseña
   * @param newPassword nueva contraseña
   * @param confirPassword confirmacion de la nueva contraseña
   * @param oldPassword contraseña vieja
   */
  ChangePasswordRequest(user:string,newPassword:string,confirPassword:string,oldPassword:string):Observable<boolean>{
    let actionName = "cambiar-clave";
    return this.http.post<boolean>(`${this.urlMsSeG}/${actionName}`,{
      Usuario:user,
      NuevaClave:newPassword,
      ConfirmacionNuevaClave:confirPassword,
      ClaveAntigua:oldPassword
      
    });
  }

  /**
   * Hace la solicitud para registar un nuevo usuario
   * @param name Nombre del usuario
   * @param lastName apellido
   * @param user correo electrónico
   * @param celular celular
   * @param rol_id visitante (por defecto)
   * @returns 
   */
  RegisternewUser(name:string, lastName:string, user:string, celular:string, rol_id:string):Observable<UserModelRegister>{
    let actionName = "usuarios";
    return this.http.post<UserModelRegister>(`${this.urlMsSeG}/${actionName}`,{
      Nombres:name,
      Apellidos:lastName,  
      email:user,
      Celular:celular,
      rolId: rol_id
    });

  }

 


}
