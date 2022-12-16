import { ZonaModel } from "./zona.model"


export class atraccionModel{
    id: string = ''
    nombre: string =''
    image: string =''
    minimo_altura = ''
    video: string =''
    descripcion?: string =''
    zonaId: string =''
    zona?: ZonaModel = new ZonaModel()
}