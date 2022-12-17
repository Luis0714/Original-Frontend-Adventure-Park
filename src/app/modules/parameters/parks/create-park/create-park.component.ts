import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApisInfo } from 'src/app/config/apisInfo';
import { cityModel } from 'src/app/models/city.model';
import { ParkModel } from 'src/app/models/park.model';
import { ParkModel2 } from 'src/app/models/park.model2';
import { CityService } from 'src/app/services/parameters/city.service';
import { ParkService } from 'src/app/services/parameters/park.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-create-park',
  templateUrl: './create-park.component.html',
  styleUrls: ['./create-park.component.css']
})
export class CreateParkComponent implements OnInit {
  urlServer: string = ApisInfo.MS_LOG_URL;
  uploadedImage: string = '';//<---------------------
  uploadedImageMap: string = '';
  uploadedImageLogo: string = '';
  isFileSelected: boolean = false;//<----------------
  isMapFileSelected: boolean = false;
  isLogoFileSelected: boolean = false;
  fGroup: FormGroup = new FormGroup({});

  ciudades: cityModel[] = [];
  ciudad:cityModel={
    id: '',
    nombre: '',
    postal: '',
    departamentoId: ''
  }
  
  constructor(
    private fb: FormBuilder,
    private secService: SecurityService,
    private parkService: ParkService,
    private cityService: CityService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
    this.ListRecords();
  }
  /**
   * Construccion del formulario con sus datos
   */
  BuildingForm(){
    this.fGroup = this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(5)]],
      direccion:['',[Validators.required]],
      visitantes:['',[Validators.required]],
      logo:['',[]],
      mapa:['',[]],
      slogan:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      ciudad1:['',[]],
      email:['',[]]
    })
  }

  

  SaveRecord() {
    if(this.fGroup.invalid){
      alert("Faltan datos");
    }else{
      let model = new ParkModel();
      model.logo = this.uploadedImageLogo;
      model.mapa = this.uploadedImageMap;
      model.nombre = this.fGroup.controls["nombre"].value;
      console.log(model.nombre, "NOMBRE")
      model.direccion = this.fGroup.controls["direccion"].value;
      console.log(model.direccion, "DIRECCION")
      model.cantidadVisitas = parseInt(this.fGroup.controls["visitantes"].value.toString());
      console.log(model.cantidadVisitas, "CANTIDAD DE VISITAS")
      let ciudad1 = this.fGroup.controls["ciudad1"].value;
      console.log(ciudad1, "CIUDAD1")
      model.ciudadId = parseInt(ciudad1);
      console.log(model.ciudadId, "CIUDADID")
      model.slogan = this.fGroup.controls["slogan"].value;
      console.log(model.slogan, "SLOGAN")
      model.descripcion = this.fGroup.controls["descripcion"].value;
      console.log(model.descripcion, "DESCRIPCION")
      model.email = this.fGroup.controls["email"].value;
      console.log(model.descripcion, "email")
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


  ListRecords() {
    this.cityService.getRecorListCity().subscribe({
      next: (data) => {
        console.log()
         this.ciudades = data;
      },error: (err) => {
       alert("Error obteniendo la información")   
    }
    })
  }
  /**
   * Se obtiene el archivo seleccionado del input file
   * @param evt evento de selección
   */
   onFileSelect(evt: any) {
    if (evt.target.files.length > 0) {
      const f = evt.target.files[0];
      this.fGroup.controls["logo"].setValue(f);
      this.isFileSelected = true;
    }
  }

  onLogoFileSelect(evt: any) {
    if (evt.target.files.length > 0) {
      const f = evt.target.files[0];
      this.fGroup.controls["logo"].setValue(f);
      this.isLogoFileSelected = true;
    }
  }

  onMapFileSelect(evt: any) {
    if (evt.target.files.length > 0) {
      const f = evt.target.files[0];
      this.fGroup.controls["mapa"].setValue(f);
      this.isMapFileSelected = true;
    }
  }

  UploadImageLogo() {
    const formData = new FormData();
    formData.append('file', this.fGroup.controls["logo"].value);
    console.log("UPLOADLOGO")
    this.parkService.uploadImage(formData).subscribe({
      next: (data) => {
        this.uploadedImageLogo = data.file;
      },
      error: (err) => {

      }
    });
  }

  UploadImageMap() {
    const formData = new FormData();
    formData.append('file', this.fGroup.controls["mapa"].value);
    console.log("UPLOADMAP")
    this.parkService.uploadImage(formData).subscribe({
      next: (data) => {
        this.uploadedImageMap = data.file;
      },
      error: (err) => {

      }
    });
  }

  UploadImage() {
    const formData = new FormData();
    formData.append('file', this.fGroup.controls["file"].value);
    this.parkService.uploadImage(formData).subscribe({
      next: (data) => {
        this.uploadedImage = data.file;
      },
      error: (err) => {

      }
    });
  }

  

  get fg(){
    return this.fGroup.controls;
  }
}
