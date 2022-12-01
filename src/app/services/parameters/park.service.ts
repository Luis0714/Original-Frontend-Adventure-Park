import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApisInfo } from 'src/app/config/apisInfo';
import { ParkModel } from 'src/app/models/park.model';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ParkService {

  Baseurl: string = ApisInfo.MS_LOG_URL;
  actionName = 'parques';
  jwt: string = '';
  url = `${this.Baseurl}/${this.actionName}`;

  constructor(
    private http: HttpClient,
    private LocalStorage: LocalStorageService
  ) {
    this.jwt = this.LocalStorage.GetSesionToken();
   }

 /**
   * Obtiene la lista de departamentos
   * @returns lista de departamentos en estructura JSON
   */
  getRecorList(): Observable<ParkModel[]> {
    return this.http.get<ParkModel[]>(this.url);
  }

 
  /**
  * obtine el departamento por el id
  * @returns id
  */
  getRecorByID(id: string): Observable<ParkModel> {
    console.log("Ruta ", this.url + "/" + id)
    return this.http.get<ParkModel>(this.url + "/" + id, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.jwt
      })
    });
  }
 /**
* obtine el departamento por el id
* @returns id
*/
getRecorByID2(id: string): Observable<ParkModel>{
  console.log(id)
  console.log("Ruta ", this.url + "/" + id)
  return this.http.get<ParkModel>(this.url + "/" + id, {
    headers: new HttpHeaders({
      "Authorization": "Bearer " + this.jwt
    })
  });
}


  /**
   * crea un nuevo registro
   * @param record info del registro a crear
   * @returns registro creado
   */
  saveRecord(record: ParkModel): Observable<ParkModel> {
    return this.http.post<ParkModel>(this.url, record, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.jwt}`,
      })
    });
  }
  /**
   * actualiza un registro
   * @param record registro a actualizar
   * @returns NA
   */
  editRecord(record: ParkModel) {
    return this.http.put(this.url + "/" + record.id, record, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.jwt}`
      })
    });
  }
  /**
   * elimina unregistro
   * @param id id del registro a eliminar
   * @returns NA
   */
  removeRecord(id: string) {
    return this.http.delete(this.url + "/" + id, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.jwt}`
      })
    });
  }
  RegisternewPARK(name:string, postal:string, ciudadId:string):Observable<ParkModel>{
    let actionName = "ciudades";
    console.log("NOMBRE: ", name, "POSTAL: ", postal, "DEPARTAMENTOID: ", ciudadId)
    return this.http.post<ParkModel>(`${this.Baseurl}/${actionName}`,{
      nombre:name,
      postal:postal,  
      departamentoId:ciudadId
    }
    );
    

  }
}

