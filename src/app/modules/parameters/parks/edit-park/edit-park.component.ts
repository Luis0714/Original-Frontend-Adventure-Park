import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApisInfo } from 'src/app/config/apisInfo';
import { cityModel } from 'src/app/models/city.model';
import { ParkModel } from 'src/app/models/park.model';
import { ParkModel2 } from 'src/app/models/park.model2';
import { CityService } from 'src/app/services/parameters/city.service';
import { ParkService } from 'src/app/services/parameters/park.service';


@Component({
  selector: 'app-edit-park',
  templateUrl: './edit-park.component.html',
  styleUrls: ['./edit-park.component.css']
})
export class EditParkComponent implements OnInit {
  urlServer: string = ApisInfo.MS_LOG_URL;
  uploadedImage: string = '';//<---------------------
  isFileSelected: boolean = false;//<----------------
  isLogoFileSelected: boolean = false;
  uploadedImageLogo: string = '';
  isMapFileSelected: boolean = false;
  uploadedImageMap: string = '';
  fGroup: FormGroup = new FormGroup({});
  ciudades: cityModel[]=[];
  nombre:string='';
  constructor(
    private fb: FormBuilder,
    private CityService: CityService,
    private ParkService: ParkService,
    private router: Router,
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
    this.SearchRequest();
    this.ListRecords();
  }
  BuildingForm(){
    this.fGroup = this.fb.group({
      id: ['',[]],
      nombre:['',[Validators.required]],
      slogan:['',[Validators.required]],
      direccion:['',[Validators.required]],
      email:['',[Validators.required]],
      cantidadVisitas:['',[Validators.required]],
      logo:['',[Validators.required]],
      mapa:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      seleccionado:['',[Validators.required]]
  
    })
  }
  SearchRequest(){
    let id = this.route.snapshot.params["id"];
    console.log("ID ",id)
    this.ParkService.getRecorByID(id).subscribe({
      next: (data)=>{
        this.CityService.getRecorByID(data.ciudadId.toString()).subscribe({
          next: (ciudad)=>{
            this.fGroup.controls["id"].setValue(data.id);
            this.fGroup.controls["nombre"].setValue(data.nombre);
            this.fGroup.controls["slogan"].setValue(data.slogan);
            this.fGroup.controls["direccion"].setValue(data.direccion);
            this.fGroup.controls["email"].setValue(data.email);
            this.fGroup.controls["cantidadVisitas"].setValue(data.cantidadVisitas);
            this.fGroup.controls["logo"].setValue(data.logo);
            this.fGroup.controls["mapa"].setValue(data.mapa);
            this.fGroup.controls["descripcion"].setValue(data.descripcion);
            this.fGroup.controls["seleccionado"].setValue(data.ciudadId);
            this.nombre=ciudad.nombre
          },
          error:(err)=>{
            alert("Error obteniendo la informacion del registro");
          }
        })
        
      },
      error:(err)=>{
        alert("Error obteniendo la informacion del registro");
      }
    })
  }

  ListRecords() {
    this.CityService.getRecorListCity().subscribe({
      next: (data) => {
        console.log("LISTArECORD")
         this.ciudades = data;
      },error: (err) => {
       alert("Error obteniendo la información")   
    }
    })
  }




  EditParkAction(){
    console.log("Entreee");
    let id = this.fGroup.controls["id"].value;
    let nombre = this.fGroup.controls["nombre"].value;
    let direccion = this.fGroup.controls["direccion"].value;
    let cantidadVisitas = this.fGroup.controls["cantidadVisitas"].value;
    let logo = this.uploadedImageLogo;
    let mapa = this.uploadedImageMap;
    let slogan = this.fGroup.controls["slogan"].value;
    let descripcion = this.fGroup.controls["descripcion"].value;
    let ciudadId = this.fGroup.controls["seleccionado"].value;
    let email = this.fGroup.controls["email"].value;

    let datos:ParkModel2={
      id: id,
      nombre: nombre,
      direccion: direccion,
      cantidadVisitas: parseInt(cantidadVisitas),
      logo: logo,
      mapa: mapa,
      slogan: slogan,
      descripcion: descripcion,
      ciudadId: parseInt(ciudadId),
      email: email
    }
    if(this.fGroup.invalid){
      alert("Faltan datos")
    }else{
    this.ParkService.editRecord(datos).subscribe({
      next:(data) =>{
        if(!data){
          alert('Registro editado con exito')
          this.router.navigate(["/parameters/list-park"])
        }
      },
      error:(err) =>{
        console.log(err)
        alert("Se ha presentado un fallo creacion del registro")
      }
  })
    }
  }
  get fg(){
    return this.fGroup.controls;
  }


  onLogoFileSelect(evt: any) {
    if (evt.target.files.length > 0) {
      const f = evt.target.files[0];
      this.fGroup.controls["logo"].setValue(f);
      this.isLogoFileSelected = true;
    }
  }

  UploadImageLogo() {
    const formData = new FormData();
    formData.append('file', this.fGroup.controls["logo"].value);
    console.log("UPLOADLOGO")
    this.ParkService.uploadImage(formData).subscribe({
      next: (data) => {
        this.uploadedImageLogo = data.file;
      },
      error: (err) => {

      }
    });
  }


  onMapFileSelect(evt: any) {
    if (evt.target.files.length > 0) {
      const f = evt.target.files[0];
      this.fGroup.controls["mapa"].setValue(f);
      this.isMapFileSelected = true;
    }
  }

  UploadImageMap() {
    const formData = new FormData();
    formData.append('file', this.fGroup.controls["mapa"].value);
    console.log("UPLOADMAP")
    this.ParkService.uploadImage(formData).subscribe({
      next: (data) => {
        this.uploadedImageMap = data.file;
      },
      error: (err) => {

      }
    });
  }

}
