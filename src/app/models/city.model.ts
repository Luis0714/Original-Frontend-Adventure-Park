import { departmentModel } from "./department.model"


export class cityModel{
    id: string =''
    nombre: string = ''
    postal: string = ''
    departamentoId: string = ''
    departamento?: departmentModel = new departmentModel()
}
