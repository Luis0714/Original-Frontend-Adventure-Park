import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, Observable } from 'rxjs';
import { ApisInfo } from 'src/app/config/apisInfo';
import { VentaPlanModel2 } from 'src/app/models/plan.venta.model2';
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
   return this.http.get<VentaPlanModel[]>('http://localhost:3000/ventas-planes');
  }
 


 /**
 * obtine el venta-planes por el id
 * @returns id
 */
 getRecorByID(id: string): Observable<VentaPlanModel> {
   console.log("Ruta ", this.url + "/" + id)
   return this.http.get<VentaPlanModel>(this.url + "/" + id);
 }
/**
* obtine el venta-planes por el id
* @returns id
*/
getRecorByID2(id: number): Observable<VentaPlanModel>{
 console.log(id)
 console.log("Ruta ", this.url + "/" + id)
 return this.http.get<VentaPlanModel>(this.url + "/" + id);
}


 /**
  * crea un nuevo registro
  * @param record info del registro a crear
  * @returns registro creado
  */
 saveRecord(record: VentaPlanModel2): Observable<VentaPlanModel> {
   return this.http.post<VentaPlanModel>(this.url, record);
 }
 /**
  * actualiza un registro
  * @param record registro a actualizar
  * @returns NA
  */
 editRecord(record: VentaPlanModel) {
   return this.http.put(this.url + "/" + record.id, record);
 }
 /**
  * elimina un registro
  * @param id id del registro a eliminar
  * @returns NA
  */
 removeRecord(id: string) {
   return this.http.delete(this.url + "/" + id);
 }


 RegisternewPlan(record:VentaPlanModel):Observable<VentaPlanModel>{
   let actionName = "planes";
   return this.http.post<VentaPlanModel>(`${this.Baseurl}/${actionName}`,record);
 }
}