import { ParkModel } from "./park.model"

export class CategoriaModel{
    id: number =0
    nombre: string = ''
    Parque?:ParkModel = new ParkModel()
}