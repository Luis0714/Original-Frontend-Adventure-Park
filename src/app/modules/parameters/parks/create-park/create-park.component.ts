import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApisInfo } from 'src/app/config/apisInfo';
import { ParkModel } from 'src/app/models/park.model';
import { ParkService } from 'src/app/services/parameters/park.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-create-park',
  templateUrl: './create-park.component.html',
  styleUrls: ['./create-park.component.css']
})
export class CreateParkComponent implements OnInit {
  urlServer: string = ApisInfo.MS_LOG_URL;
  uploadedImage: string = '';
  isFileSelected: boolean = false;
  fGroup: FormGroup = new FormGroup({});
  
  constructor(
    private fb: FormBuilder,
    private secService: SecurityService,
    private parkService: ParkService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
  }
  /**
   * Construccion del formulario con sus datos
   */
  BuildingForm(){
    this.fGroup = this.fb.group({
      id:['',[]],
      nombre:['',[Validators.required,Validators.minLength(5)]],
      direccion:['',[Validators.required]],
      ciudad:['',[Validators.required],Validators.maxLength(4)],
      visitantes:['',[Validators.required]],
      mapa:['',[Validators.required]],
      logo:['',[Validators.required]],
      slogan:['',[Validators.required]],
      descripcion:['',[Validators.required]]
    })
  }

  /**
   * Se obtiene el archivo seleccionado del input file
   * @param evt evento de selección
   */
   onFileSelect(evt: any) {
    if (evt.target.files.length > 0) {
      const f = evt.target.files[0];
      this.fGroup.controls["file"].setValue(f);
      this.isFileSelected = true;
    }
  }

  UploadImage() {
    const formData = new FormData();
    formData.append('file', this.fGroup.controls["file"].value);
    this.parkService.uploadImage(formData).subscribe({
      next: (data) => {
        this.uploadedImage = data.file;
        alert("Imagen cargada");
      },
      error: (err) => {

      }
    });
  }

  SaveRecord() {
    if(this.fGroup.invalid){
      alert("Faltan datos");
    }else{
      let model = new ParkModel();
      model.logo = this.uploadedImage;
      model.mapa = this.uploadedImage;
      model.nombre = this.fGroup.controls["name"].value;
      model.direccion = this.fGroup.controls["direccion"].value;
      model.ciudadId = this.fGroup.controls["ciudad"].value;
      model.slogan = this.fGroup.controls["slogan"].value;
      model.descripcion = this.fGroup.controls["descripcion"].value;
      this.parkService.saveRecord(model).subscribe({
        next:(data)=>{
          alert("Registro almacenado correctamente.");
          this.router.navigate(["/parameters/list-park"]);
        },
        error:(err)=>{

        }
      });
    }
  }

  get fg(){
    return this.fGroup.controls;
  }
}
