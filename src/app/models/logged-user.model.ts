import { UserModel } from "./user.model";

export class LoggedUser{
    Token: string = '';
    User: UserModel = {
        correo:'',
        id:'',
        isLogged:false,
        nombre:'',
        rol:''
       
    }

}