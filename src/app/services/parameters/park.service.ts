import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApisInfo } from 'src/app/config/apisInfo';
import { ParkModel } from 'src/app/models/park.model';
import { LocalStorageService } from '../local-storage.service';
import { UploadedFileModel } from 'src/app/models/uploaded.file.model';
import { ParkModel2 } from 'src/app/models/park.model2';
import { ParkModel3 } from 'src/app/models/park.model3';

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
    private lsService: LocalStorageService
  ) {
    this.jwt = lsService.GetSesionToken();
   }

 /**
   * Obtiene la lista de parques
   * @returns lista de parques en estructura JSON
   */
  getRecorList():Observable<ParkModel[]>{ 
    return this.http.get<ParkModel[]>(this.url+'?filter={"include":["ciudad"]}',{
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.jwt
      })
    });    
   }

   getRecorListPark(): Observable<ParkModel[]> {
    return this.http.get<ParkModel[]>(this.url,{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+this.jwt
      })
    });
   }

 
  /**
  * obtine el parque por el id
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
* obtine el parque por el id
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
    email: record.email,
    ciudadId: record.ciudadId,
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
   editRecord(record: ParkModel2) {
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
    let actionName: string = "cargar-archivo";
    return this.http.post<UploadedFileModel>(`${this.Baseurl}/${actionName}`, formData, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.jwt}`
      })
    });
  }
  RegisternewPark(record:ParkModel):Observable<ParkModel>{
    let actionName = "parques";
    console.log(record, "RECORD")
    return this.http.post<ParkModel>(`${this.Baseurl}/${actionName}`,record,{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+this.jwt
      })
    });
   }
}

