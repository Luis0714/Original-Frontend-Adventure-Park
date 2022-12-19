import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
//import {Chart} from 'chart.js/auto';
import { concat } from 'rxjs';
import { ApisInfo } from 'src/app/config/apisInfo';
import { planModel } from 'src/app/models/plans.model';

declare const FirstReport: any;

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.css'],
})
export class ChartjsComponent implements OnInit {
  Baseurl: string = ApisInfo.MS_LOG_URL;
  actionName = 'planes';
  reportPlan: number = 1;
  url = `${this.Baseurl}/${this.actionName}`;
  url2 = "http://localhost:3000/planes";
  //${this.reportPlan}
  month: string = '';
  json: any;
  jsonNombre: any;
  jsonPlanes: any;

  constructor(
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.report();
  }

  async obtenerCantidad(id: number){
    this.json = await this.ayuda(id)
    let cantidad = 0
    for(let i = 0; i < this.json.length; i++ ){
      cantidad += this.json[i].cant
    }
    console.log("Hola" + " " + this.json.length)
    console.log("cantidad vendida" + " " + cantidad + "id: " + id)
    return cantidad
    
  }

  async obtenerNombre(id: number){
    this.jsonNombre = await this.ayuda(id)
    let id2 = this.jsonNombre[0].planesId
    this.jsonNombre = await this.plan(id2)
    let nombre = this.jsonNombre.nombre

    console.log("nombre: " + " " + nombre)
    return nombre
  }

  async ayuda(id: number):Promise<Array<string>>{
    return new Promise<Array<string>>((resolve,reject) =>{
      fetch(this.url+"/"+id+"/ventas-planes")
      .then(res => res.json())
      .then(out =>
      resolve(out))
      .catch(err => { reject(err) });
    })
  }

  async plan(id: number):Promise<Array<string>>{
    return new Promise<Array<string>>((resolve,reject) =>{
      fetch(this.url+"/"+id)
      .then(res => res.json())
      .then(out =>
      resolve(out))
      .catch(err => { reject(err) });
    })
  }

  async obtenerPlanes():Promise<Array<string>>{
    return new Promise<Array<string>>((resolve,reject) =>{
      fetch(this.url)
      .then(res => res.json())
      .then(out =>
      resolve(out))
      .catch(err => { reject(err) });
    })
  }

  async report() {
    let data = [];
    this.jsonPlanes = await this.obtenerPlanes()
    for(let i = 0; i < this.jsonPlanes.length; i++){
      console.log(this.jsonPlanes[i].id)
      let datos = {
        plan: await this.obtenerNombre(this.jsonPlanes[i].id),
        count: await this.obtenerCantidad(this.jsonPlanes[i].id),
      }
      data.push(datos) 
    }
    FirstReport(data);
  }
}
