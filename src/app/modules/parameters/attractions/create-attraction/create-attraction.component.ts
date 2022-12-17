import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApisInfo } from 'src/app/config/apisInfo';
import { ParkModel } from 'src/app/models/park.model';
import { CityService } from 'src/app/services/parameters/city.service';
import { ParkService } from 'src/app/services/parameters/park.service';
import { SecurityService } from 'src/app/services/security.service';
import { AttractionService} from 'src/app/services/parameters/attraction.service';
import { atraccionModel} from 'src/app/models/atraccion.model';
import { ZonaService } from 'src/app/services/parameters/zona.service';
import { ZonaModel } from 'src/app/models/zona.model';
@Component({
  selector: 'app-create-attraction',
  templateUrl: './create-attraction.component.html',
  styleUrls: ['./create-attraction.component.css']
})
export class CreateAttractionComponent implements OnInit {
  urlServer: string = ApisInfo.MS_LOG_URL;
  uploadedImage: string = '';//<---------------------
  isFileSelected: boolean = false;//<----------------
  fGroup: FormGroup = new FormGroup({});
  zonas: ZonaModel[] =[];
  zona: ZonaModel={
    id: 0,
    nombre: '',
    color: '',
    descripcion: '',
    parqueId: 0
  }
  constructor(
    private fb: FormBuilder,
    private zonaService: ZonaService,
    private attractionService: AttractionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
    this.ListRecords();
  }

BuildingForm(){
    this.fGroup = this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(5)]],
      image:['',[]],
      minimo_altura:['',[Validators.required]],
      video:['',[]],
      descripcion:['',[Validators.required]],
      zona1:['',[]]
    })
  }

  

  SaveRecord() {
    if(this.fGroup.invalid){
      alert("Faltan datos");
    }else{
      let model = new atraccionModel();
      model.image = this.uploadedImage;
      console.log("image", this.uploadedImage)
      model.nombre = this.fGroup.controls["nombre"].value;
      console.log("nombre", model.nombre)
      model.minimo_altura = this.fGroup.controls["minimo_altura"].value;
      console.log("Minimo de altura", model.minimo_altura)
      let zona1 = this.fGroup.controls["zona1"].value;
      model.zona= zona1;
      model.zonaId=zona1;
      console.log("Zona", zona1)
      model.video = this.fGroup.controls["video"].value;
      console.log("video", model.video)
      model.descripcion = this.fGroup.controls["descripcion"].value;
      console.log("descripcion", model.descripcion)
      this.attractionService.RegisternewAttraction(model).subscribe({
        next:(data)=>{
          alert("Registro almacenado correctamente.");
          this.router.navigate(["/parameters/list-attraction"]);
        },
        error:(err)=>{

        }
      });
    }
  }


  ListRecords() {
    this.zonaService.getRecorList().subscribe({
      next: (data) => {
        console.log()
         this.zonas = data;
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
      this.fGroup.controls["image"].setValue(f);
      this.isFileSelected = true;
    }
  }
  UploadImage() {
    const formData = new FormData();
    console.log("cree formData")
    formData.append('file', this.fGroup.controls["image"].value);
    console.log("file LLEGUE")
    this.attractionService.uploadImage(formData).subscribe({
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
