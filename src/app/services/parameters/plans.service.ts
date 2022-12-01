import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApisInfo } from 'src/app/config/apisInfo';
import { LocalStorageService } from '../local-storage.service';
import { planModel } from 'src/app/models/plans.model';
import { planModel2 } from 'src/app/models/plans.model2';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlansService {
  Baseurl: string = ApisInfo.MS_LOG_URL;
  actionName = 'planes';
  jwt: string = '';
  url = `${this.Baseurl}/${this.actionName}`;
  
  constructor(
    private http: HttpClient,
    private LocalStorage: LocalStorageService
  ) { 
    this.jwt = LocalStorage.GetSesionToken();
  }
  /**
   * Obtiene la lista de planes
   * @returns lista de departamentos en estructura JSON
   */
   getRecorList(): Observable<planModel[]> {
    return this.http.get<planModel[]>(this.url,{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+this.jwt
      })
    });
   }
  

 
  /**
  * obtine el planes por el id
  * @returns id
  */
  getRecorByID(id: string): Observable<planModel> {
    console.log("Ruta ", this.url + "/" + id)
    return this.http.get<planModel>(this.url + "/" + id, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.jwt
      })
    });
  }
 /**
* obtine el planes por el id
* @returns id
*/
getRecorByID2(id: number): Observable<planModel>{
  console.log(id)
  console.log("Ruta ", this.url + "/" + id)
  return this.http.get<planModel>(this.url + "/" + id, {
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
  saveRecord(record: planModel2): Observable<planModel> {
    return this.http.post<planModel>(this.url, record, {
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
  editRecord(record: planModel) {
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


  RegisternewPlan(record:planModel2):Observable<planModel2>{
    let actionName = "planes";
    return this.http.post<planModel2>(`${this.Baseurl}/${actionName}`,record, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.jwt}`,
      })
    });
  }
}