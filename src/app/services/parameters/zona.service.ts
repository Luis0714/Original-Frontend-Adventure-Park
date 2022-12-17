import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApisInfo } from 'src/app/config/apisInfo';
import { ParkModel } from 'src/app/models/park.model';
import { ZonaModel } from 'src/app/models/zona.model';
import { ZonaModel2 } from 'src/app/models/zona.model2';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ZonaService {
  Baseurl: string = ApisInfo.MS_LOG_URL
  actionName = 'zonas';
  jwt: string = '';
  url = `${this.Baseurl}/${this.actionName}`;
  constructor(
    private http: HttpClient,
    private LocalStorage: LocalStorageService
  ) {
    this.jwt = this.LocalStorage.GetSesionToken();
  }
  /**
   * obtine la lista de roles
   * @returns lista de roles en json
   */
  getRecorList(): Observable<ZonaModel[]> {
    return this.http.get<ZonaModel[]>(this.url+'?filter={"include":["parque"]}',{
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.jwt
      })
    });
  }

  

  /**
  * obtine el rol por el id
  * @returns id
  */
  getRecorByID(id: string): Observable<ZonaModel> {
    console.log("Ruta ", this.url + "/" + id)
    return this.http.get<ZonaModel>(this.url + "/" + id+'?filter={"include":["parque"]}', {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.jwt
      })
    });
  }

  /**
* obtine el rol por el id
* @returns id
*/
/*
  getRecorByID2(id: string):Observable<RolModel2> {
    console.log("Ruta ", this.url + "/" + id)
    return this.http.get<RolModel2>(this.url + "/" + id, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.jwt
      })
    });
  }*/
  /**
   * crea un nuevo registro
   * @param record info del registro a crear
   * @returns registro creado
   */
  saveRecord(record: ZonaModel2):Observable<ZonaModel> {
    return this.http.post<ZonaModel>(this.url, record, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " +this.jwt
      })
    });
  }
  /**
   * actualiza un registro
   * @param record registro a actualizar
   * @returns NA
   */
  editRecord(record: ZonaModel) {
    return this.http.put(this.url + "/" + record.id+"", record, {
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
}
