import { ParkModel } from "./park.model";

export class ZonaModel2{
    nombre:string='';
    color: string='';
    descripcion:string='';
    parqueId:number = 0; 
    parque?: ParkModel = new ParkModel()  
}