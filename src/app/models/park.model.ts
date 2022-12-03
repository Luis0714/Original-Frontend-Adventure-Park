import { cityModel } from "./city.model"

export class ParkModel{
    id: string = ''
    nombre: string = ''
    direccion: string = ''
    cantidadVisitas: string = ''
    logo: string = ''
    mapa: string = ''
    slogan: string = ''
    descripcion: string = ''
    ciudadId: string = ''
    email: string=''
    ciudad?: cityModel = new cityModel()
        
}