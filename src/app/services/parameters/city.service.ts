import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApisInfo } from 'src/app/config/apisInfo';
import { cityModel } from 'src/app/models/city.model';
import { cityModel2 } from 'src/app/models/city.model2';
import { cityModel3 } from 'src/app/models/city.model3';

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
   * Obtiene la lista de Ciudades
   * @returns lista de Ciudades en estructura JSON
   */
   getRecorList():Observable<cityModel[]>{
    return this.http.get<cityModel[]>(this.url);   
   }
 
    /**
    * obtine el ciudades por el id
    * @returns id
    */
     getRecorByID(id:string):Observable<cityModel>{
       console.log("Ruta ",this.url+"/"+id)
       return this.http.get<cityModel>(this.url+"/"+id,{
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
   saveRecord(record:cityModel2):Observable<cityModel>{
     return this.http.post<cityModel>(this.url,record,{
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
    editRecord(record:cityModel){
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

    RegisternewCity(name:string, postal:string, departamentoId:string):Observable<cityModel3>{
      let actionName = "ciudades";
      console.log("NOMBRE: ", name, "POSTAL: ", postal, "DEPARTAMENTOID: ", departamentoId)
      return this.http.post<cityModel3>(`${this.Baseurl}/${actionName}`,{
        nombre:name,
        postal:postal,  
        departamentoId:departamentoId
      }
      );
      
  
    }
}
