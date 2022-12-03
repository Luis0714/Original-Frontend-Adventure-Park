import { ParkModel } from "./park.model";

export class ZonaModel{
        id: number= 0;
        nombre:string='';
        color: string='';
        descripcion:string='';
        parqueId:number = 0; 
        parque?: ParkModel = new ParkModel()  
}