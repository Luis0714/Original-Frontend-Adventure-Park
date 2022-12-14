import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApisInfo } from 'src/app/config/apisInfo';
import { RolModel } from 'src/app/models/rol.model';
import { RolModel2 } from 'src/app/models/rol.model2';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RolServiceService {
  Baseurl: string = ApisInfo.MS_SEG_URL;
  actionName = 'rols';
  jwt: string = '';
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
  getRecorList(): Observable<RolModel[]> {
    return this.http.get<RolModel[]>(this.url);
  }

  /**
  * obtine el rol por el id
  * @returns id
  */
  getRecorByID(id: string): Observable<RolModel> {
    console.log("Ruta ", this.url + "/" + id)
    return this.http.get<RolModel>(this.url + "/" + id, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.jwt
      })
    });
  }

  /**
* obtine el rol por el id
* @returns id
*/
  getRecorByID2(id: string): Observable<RolModel2> {
    console.log("Ruta ", this.url + "/" + id)
    return this.http.get<RolModel2>(this.url + "/" + id, {
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
  saveRecord(record: RolModel2): Observable<RolModel> {
    return this.http.post<RolModel>(this.url, record, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.jwt}`
      })
    });
  }
  /**
   * actualiza un registro
   * @param record registro a actualizar
   * @returns NA
   */
  editRecord(record: RolModel) {
    return this.http.put(this.url + "/" + record._id, record, {
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
