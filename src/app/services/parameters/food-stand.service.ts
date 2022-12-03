import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApisInfo } from 'src/app/config/apisInfo';
import { FoodStandModel } from 'src/app/models/food-stand.model';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class FoodStandService {
  Baseurl: string = ApisInfo.MS_LOG_URL;
  actionName = 'stand-comidas';
  jwt: string = '';
  url = `${this.Baseurl}/${this.actionName}`;

  constructor(
    private http: HttpClient,
    private LocalStorage: LocalStorageService
  ) { 
    this.jwt = LocalStorage.GetSesionToken();
  }
  getRecorList(): Observable<FoodStandModel[]> {
    return this.http.get<FoodStandModel[]>(this.url+'?filter={"include":["planes"]}',{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+this.jwt
      })
    });
   }
  
 
 
  /**
  * obtine el venta-planes por el id
  * @returns id
  */
  getRecorByID(id: string): Observable<FoodStandModel> {
    console.log("Ruta ", this.url + "/" + id)
    return this.http.get<FoodStandModel>(this.url + "/" + id, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.jwt
      })
    });
  }
 /**
 * obtine el venta-planes por el id
 * @returns id
 */
 getRecorByID2(id: number): Observable<FoodStandModel>{
  console.log(id)
  console.log("Ruta ", this.url + "/" + id)
  return this.http.get<FoodStandModel>(this.url + "/" + id, {
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
  saveRecord(record: FoodStandModel): Observable<FoodStandModel> {
    return this.http.post<FoodStandModel>(this.url, record, {
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
  editRecord(record: FoodStandModel) {
    return this.http.put(this.url + "/" + record.id, record, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.jwt}`
      })
    });
  }
  /**
   * elimina un registro
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
 
 
  RegisternewPlan(record:FoodStandModel):Observable<FoodStandModel>{
    let actionName = "planes";
    return this.http.post<FoodStandModel>(`${this.Baseurl}/${actionName}`,record, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.jwt}`,
      })
    });
  }
 }