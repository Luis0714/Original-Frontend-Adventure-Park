import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApisInfo } from 'src/app/config/apisInfo';
import { atraccionModel } from 'src/app/models/atraccion.model';
import { UploadedFileModel } from 'src/app/models/uploaded.file.model';
import { LocalStorageService } from '../local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AttractionService {
  Baseurl: string = ApisInfo.MS_LOG_URL;
  actionName = 'atracciones';
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
   getRecorList():Observable<atraccionModel[]>{ 
    return this.http.get<atraccionModel[]>(this.url+'?filter={"include":["zona"]}',{
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.jwt
      })
    });    
   }

 
  /**
  * obtine el parque por el id
  * @returns id
  */
  getRecorByID(id: string): Observable<atraccionModel> {
    console.log("Ruta ", this.url + "/" + id)
    return this.http.get<atraccionModel>(this.url + "/" + id, {
      headers: new HttpHeaders({
        "Authorization": "Bearer " + this.jwt
      })
    });
  }
 /**
* obtine el parque por el id
* @returns id
*/
getRecorByID2(id: string): Observable<atraccionModel>{
  console.log(id)
  console.log("Ruta ", this.url + "/" + id)
  return this.http.get<atraccionModel>(this.url + "/" + id, {
    headers: new HttpHeaders({
      "Authorization": "Bearer " + this.jwt
    })
  });
}
saveRecord(record: atraccionModel): Observable<atraccionModel> {
  return this.http.post<atraccionModel>(this.url, {
    nombre: record.nombre,
    image: record.image,
    minimo_altura: record.minimo_altura,
    video: record.video,
    descripcion: record.descripcion,
    zonaId: record.zonaId,
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
   editRecord(record: atraccionModel) {
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
  RegisternewPark(record:atraccionModel):Observable<atraccionModel>{
    let actionName = "parques";
    console.log(record, "RECORD")
    return this.http.post<atraccionModel>(`${this.Baseurl}/${actionName}`,record,{
      headers:new HttpHeaders({
        "Authorization":"Bearer "+this.jwt
      })
    });
   }
}