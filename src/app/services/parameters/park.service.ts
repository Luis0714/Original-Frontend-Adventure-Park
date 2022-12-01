import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApisInfo } from 'src/app/config/apisInfo';
import { ParkModel } from 'src/app/models/park.model';
import { LocalStorageService } from '../local-storage.service';
import { UploadedFileModel } from 'src/app/models/uploaded.file.model';

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
    return this.http.get<ParkModel[]>(this.url,{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+this.jwt
      })
    });
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
saveRecord(record: ParkModel): Observable<ParkModel> {
  return this.http.post<ParkModel>(this.url, {
    nombre: record.nombre,
    direccion: record.direccion,
    cantidadVisitas: record.cantidadVisitas,
    logo: record.logo,
    mapa: record.mapa,
    slogan: record.slogan,
    descripcion: record.descripcion,
    ciudad: record.ciudadId,
  }, {
    headers: new HttpHeaders({
      "Authorization": `Bearer ${this.jwt}`
    })
  });
}
  /**
   * Actualiza un registro
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
   * Elimina un registro
   * @param id id del registro a eliminar
   * @returns NA
   */
  removeRecord(id: number) {
    return this.http.delete(this.url + "/" + id, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.jwt}`
      })
    });
  }


  uploadImage(formData: FormData): Observable<UploadedFileModel> {
    let actionName: string = "cargar-archivo-movimiento";
    return this.http.post<UploadedFileModel>(`${this.Baseurl}/${actionName}`, formData, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.jwt}`
      })
    });
  }

}

