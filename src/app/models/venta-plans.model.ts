import { planModel } from "./plans.model"


export class VentaPlanModel{
    id: number = 0
    fecha?: string =''
    impuestos?: number = 0
    total?: number = 0
    cant: number =0
    planesId: number =0
    planes?: planModel= new planModel()
    plan?:string='' 


}