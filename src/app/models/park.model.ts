//import { CategoriaModel } from "./categoria.model"
import { cityModel } from "./city.model"

export class ParkModel{
    id: string = ''
    nombre: string = ''
    direccion: string = ''
    cantidadVisitas: number = 0
    logo: string = ''
    mapa: string = ''
    slogan: string = ''
    descripcion: string = ''
    ciudadId: number = 0
    email: string=''
    ciudad?: cityModel = new cityModel()
    //categoria?:CategoriaModel = new CategoriaModel()     
}