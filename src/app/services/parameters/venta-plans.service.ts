import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { ApisInfo } from 'src/app/config/apisInfo';
import { VentaPlanModel } from 'src/app/models/venta-plans.model';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class VentaPlansService {
  Baseurl: string = ApisInfo.MS_LOG_URL;
  actionName = 'ventas-planes';
  jwt: string = '';
  url = `${this.Baseurl}/${this.actionName}`;

  constructor(
    private http: HttpClient,
    private LocalStorage: LocalStorageService
  ) { 
    this.jwt = LocalStorage.GetSesionToken();
  } 
  
  /**
  * Obtiene la lista de la venta de planes
  * @returns lista de venta en estructura JSON
  */
  getRecorList(): Observable<VentaPlanModel[]> {
   return this.http.get<VentaPlanModel[]>(this.url+'?filter={"include":["planes"]}',{
     headers:new HttpHeaders({
       "Authorization":"Bearer "+this.jwt
     })
   });
  }
 


 /**
 * obtine el venta-planes por el id
 * @returns id
 */
 getRecorByID(id: string): Observable<VentaPlanModel> {
   console.log("Ruta ", this.url + "/" + id)
   return this.http.get<VentaPlanModel>(this.url + "/" + id, {
     headers: new HttpHeaders({
       "Authorization": "Bearer " + this.jwt
     })
   });
 }
/**
* obtine el venta-planes por el id
* @returns id
*/
getRecorByID2(id: number): Observable<VentaPlanModel>{
 console.log(id)
 console.log("Ruta ", this.url + "/" + id)
 return this.http.get<VentaPlanModel>(this.url + "/" + id, {
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
 saveRecord(record: VentaPlanModel): Observable<VentaPlanModel> {
   return this.http.post<VentaPlanModel>(this.url, record, {
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
 editRecord(record: VentaPlanModel) {
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


 RegisternewPlan(record:VentaPlanModel):Observable<VentaPlanModel>{
   let actionName = "planes";
   return this.http.post<VentaPlanModel>(`${this.Baseurl}/${actionName}`,record, {
     headers: new HttpHeaders({
       "Authorization": `Bearer ${this.jwt}`,
     })
   });
 }
}