import { ZonaModel } from "./zona.model"


export class atraccionModel{
    id: string = ''
    nombre: string =''
    image: string =''
    minimo_altura = ''
    video: string =''
    descripcion?: string =''
    zonaId: number = 0
    zona?: ZonaModel = new ZonaModel()
}