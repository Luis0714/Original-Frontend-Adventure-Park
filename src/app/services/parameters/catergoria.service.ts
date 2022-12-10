import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApisInfo } from 'src/app/config/apisInfo';
import { CategoriaModel } from 'src/app/models/categoria.model';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CatergoriaService {
  Baseurl:string=ApisInfo.MS_LOG_URL;
  actionName = 'categorias';
  jwt:string = ''
  url = `${this.Baseurl}/${this.actionName}`;
  constructor(
    private http: HttpClient,
    private LocalStorage: LocalStorageService
  ) { 
    this.jwt=this.LocalStorage.GetSesionToken();
  }
  /**
   * Obtiene la lista de Ciudades
   * @returns lista de Ciudades en estructura JSON
   */
   getRecorList():Observable<CategoriaModel[]>{ 
    return this.http.get<CategoriaModel[]>(this.url+'?filter={"include":["parques"]}',{
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.jwt
      })
    });     
   }

   getRecorListCity(): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(this.url,{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+this.jwt
      })
    });
   }
 
    /**
    * obtine el ciudades por el id
    * @returns id
    */
     getRecorByID(id:string):Observable<CategoriaModel>{
       console.log("Ruta ",this.url+"/"+id)
       return this.http.get<CategoriaModel>(this.url+"/"+id,{
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
   saveRecord(record:CategoriaModel):Observable<CategoriaModel>{
    console.log(this.jwt);
     return this.http.post<CategoriaModel>(this.url,record,{
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
    editRecord(record:CategoriaModel){
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

    RegisternewCity(record:CategoriaModel):Observable<CategoriaModel>{
      let actionName = "ciudades";
      console.log(record, "RECORD")
      return this.http.post<CategoriaModel>(`${this.Baseurl}/${actionName}`,record,{
        headers:new HttpHeaders({
          "Authorization":"Bearer "+this.jwt
        })
      });
     }
}

