import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApisInfo } from '../../../app/config/apisInfo';
import { UserModel2 } from '../../../app/models/user.model2';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  Baseurl:string=ApisInfo.MS_SEG_URL;
  actionName = 'usuarios';
  jwt:string = '';
  url = `${this.Baseurl}/${this.actionName}`;
  constructor(
    private http: HttpClient,
    private LocalStorage: LocalStorageService
  ) { 
    this.jwt = LocalStorage.GetSesionToken();
  }
  /**
   * obtine la lista de roles
   * @returns lista de roles en json
   */
  getRecorList():Observable<UserModel2[]>{
   return this.http.get<UserModel2[]>(this.url);
  }

   /**
   * obtine el rol por el id
   * @returns id
   */
    getRecorByID(id:string):Observable<UserModel2>{
      console.log("Ruta ",this.url+"/"+id)
      return this.http.get<UserModel2>(this.url+"/"+id,{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+this.jwt
      })
    });
     }
  /**
   * crea un nuevo registro
   * @param record info del registro a crear
   * @returns registro creado
   */
  saveRecord(record:UserModel2):Observable<UserModel2>{
    return this.http.post<UserModel2>(this.url,record,{
      headers:new HttpHeaders({
        "Authorization": `Bearer ${this.jwt}`
      })
    });
   }
   /**
    * actualiza un registro
    * @param record registro a actualizar
    * @returns NA
    */
   editRecord(record:UserModel2){
    return this.http.put(this.url+"/"+record._id,record,{
      headers:new HttpHeaders({
        "Authorization": `Bearer ${this.jwt}`
      })
    });
   }
   /**
    * elimina unregistro
    * @param id id del registro a eliminar
    * @returns NA
    */
   removeRecord(id:string){
    return this.http.delete(this.url+"/"+id,{
      headers:new HttpHeaders({
        "Authorization": `Bearer ${this.jwt}`
      })
    });
   }
}
