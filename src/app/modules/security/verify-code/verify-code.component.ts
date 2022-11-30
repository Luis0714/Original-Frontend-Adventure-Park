import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { DefaultValues } from 'src/app/config/default-values';
import { LoggedUser } from 'src/app/models/logged-user.model';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { SecurityService } from 'src/app/services/security.service';
var MD5 = require("crypto-js/md5");

declare const iniciarMenuDesplegable:any;
@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.component.html',
  styleUrls: ['./verify-code.component.css']
})

export class VerifyCodeComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  entra:boolean=false;


  constructor(
    private fb: FormBuilder,
    private secService: SecurityService,
    private router: Router,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
  }
  /**
   * Construccion del formulario con sus datos
   */
  BuildingForm(){
    this.fGroup = this.fb.group({
      code:["",[Validators.required,Validators.minLength(6)]]
    })
  }
  /**
   * Ejecucion de la funcionalidad del boton
   */
 VerifyCodeAction(){
    let code = this.fGroup.controls["code"].value;
    console.log(code)
    this.secService.VerifyCodeRequest(code).subscribe({
      
      next:(data:LoggedUser) =>{
        if(data.Token != null){
          // Local storage
          console.log("------ llega ------")
          console.log(data.User.isLogged)
          data.User.isLogged=true;
          console.log("------ se guarda ------")
          console.log(data.User.isLogged)
          this.localStorage.SaveUserData(data);
          //Item de inicio de sesion

          //Mandar al home
          this.entra = true;
          this.router.navigate(["/home"])
          document.location.reload();
        }else{
          alert("Datos invalidos!");
          this.router.navigate(["/security/login"])
        }
      },
      error:(err) =>{
        console.log(err)
        alert("Se ha presentado un fallo en el proceso de verificacion de codigo")
      }
    }
    );
  }


  get fg(){
    return this.fGroup.controls;
  }
}
