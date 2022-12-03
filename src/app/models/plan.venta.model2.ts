import { planModel } from "./plans.model"


export class VentaPlanModel2{
    fecha?:Date = new Date()
    impuestos?: number = 0
    total?: number = 0
    cant: number =0
    planesId: number =0
    planes?: planModel= new planModel() 


}