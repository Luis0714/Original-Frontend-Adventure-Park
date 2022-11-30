import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApisInfo } from 'src/app/config/apisInfo';
import { CityModel } from 'src/app/models/city.model';
import { cityModel2 } from 'src/app/models/city.model2';

@Injectable({
  providedIn: 'root'
})
export class CityService {
  Baseurl:string=ApisInfo.MS_LOG_URL;
  actionName = 'ciudades';
  jwt:string = '';
  url = `${this.Baseurl}/${this.actionName}`;
  constructor(
    private http: HttpClient
  ) { }
  /**
   * Obtiene la lista de departamentos
   * @returns lista de departamentos en estructura JSON
   */
   getRecorList():Observable<CityModel[]>{
    return this.http.get<CityModel[]>(this.url);   
   }
 
    /**
    * obtine el departamento por el id
    * @returns id
    */
     getRecorByID(id:string):Observable<CityModel>{
       console.log("Ruta ",this.url+"/"+id)
       return this.http.get<CityModel>(this.url+"/"+id,{
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
   saveRecord(record:cityModel2):Observable<CityModel>{
     return this.http.post<CityModel>(this.url,record,{
       headers:new HttpHeaders({
         "Authorization": `Bearer ${this.jwt}`,
       })
     });
    }
    /**
     * actualiza un registro
     * @param record registro a actualizar
     * @returns NA
     */
    editRecord(record:CityModel){
     return this.http.put(this.url+"/"+record.id,record,{
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
