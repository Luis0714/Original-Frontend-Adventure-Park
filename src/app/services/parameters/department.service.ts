import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApisInfo } from 'src/app/config/apisInfo';
import { departmentModel } from 'src/app/models/department.model';
import { departmentModel2 } from 'src/app/models/department.model2';
import { LocalStorageService } from '../local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  Baseurl: string = ApisInfo.MS_LOG_URL;
  actionName = 'departamentos';
  jwt: string = '';
  url = `${this.Baseurl}/${this.actionName}`;

  constructor(
    private http: HttpClient,
    private LocalStorage: LocalStorageService
  ) {
    this.jwt = LocalStorage.GetSesionToken();
  }

  /**
   * Obtiene la lista de departamentos
   * @returns lista de departamentos en estructura JSON
   */
  getRecorList(): Observable<departmentModel[]> {
    return this.http.get<departmentModel[]>(this.url);
  }

 
  /**
  * obtine el departamento por el id
  * @returns id
  */
  getRecorByID(id: string): Observable<departmentModel> {
    console.log("Ruta ", this.url + "/" + id)
    return this.http.get<departmentModel>(this.url + "/" + id, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.jwt
      })
    });
  }
 /**
* obtine el departamento por el id
* @returns id
*/
getRecorByID2(id: string): Observable<departmentModel>{
  console.log(id)
  console.log("Ruta ", this.url + "/" + id)
  return this.http.get<departmentModel>(this.url + "/" + id, {
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
  saveRecord(record: departmentModel2): Observable<departmentModel> {
    return this.http.post<departmentModel>(this.url, record, {
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
  editRecord(record: departmentModel) {
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
}
