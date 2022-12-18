import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApisInfo } from 'src/app/config/apisInfo';
import { ZonaModel } from 'src/app/models/zona.model';
import { AttractionService } from 'src/app/services/parameters/attraction.service';
import { ZonaService } from 'src/app/services/parameters/zona.service';
import { SecurityService } from 'src/app/services/security.service';
import { ParkModel } from 'src/app/models/park.model';
import { ParkService } from 'src/app/services/parameters/park.service';
import { atraccionModel } from 'src/app/models/atraccion.model';


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

  zonas: ZonaModel[] = [];
  zona:ZonaModel={
    id: 0,
    nombre:'',
    color: '',
    descripcion: '',
    parqueId: 0
  }

  constructor(
    private fb: FormBuilder,
    private secService: SecurityService,
    private attractionService: AttractionService,
    private zoneService: ZonaService,
    private router: Router,
    private parkService: ParkService
  ) { }

  ngOnInit(): void {
    this.BuildingForm();
    this.ListRecords();
  }

  BuildingForm(){
    this.fGroup = this.fb.group({
      nombre:['',[Validators.required,Validators.minLength(5)]],
      imagen: ['',[Validators.required]],
      min_altura:['',[Validators.required]],
      video:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      zonaId:['',[Validators.required]] 
    })
  }
  
  ListRecords() {
    this.zoneService.getRecorList().subscribe({
      next: (data) => {
        console.log()
         this.zonas = data;
      },error: (err) => {
       alert("Error obteniendo la información")   
    }
    })
  }

  get fg(){
    return this.fGroup.controls;
  }

    /**
   * Se obtiene el archivo seleccionado del input file
   * @param evt evento de selección
   */
     onFileSelect(evt: any) {
      if (evt.target.files.length > 0) {
        const f = evt.target.files[0];
        this.fGroup.controls["imagen"].setValue(f);
        this.isFileSelected = true;
      }
    }


    SaveRecord() {
      if(this.fGroup.invalid){
        alert("Faltan datos");
      }else{
        let model = new atraccionModel();
        model.image = this.uploadedImage;
        model.nombre = this.fGroup.controls["nombre"].value;
        model.minimo_altura = this.fGroup.controls["min_altura"].value;
        model.video = this.fGroup.controls["video"].value.toString();
        let zona = this.fGroup.controls["zonaId"].value;
        model.zonaId = parseInt(zona);
        model.descripcion = this.fGroup.controls["descripcion"].value;
        this.attractionService.saveRecord(model).subscribe({
          next:(data)=>{
            alert("Registro almacenado correctamente.");
            this.router.navigate(["/parameters/list-attraction"]);
          },
          error:(err)=>{
  
          }
        });
      }
    }

    UploadImage() {
      const formData = new FormData();
      formData.append('file', this.fGroup.controls["imagen"].value);
      this.attractionService.uploadImage(formData).subscribe({
        next: (data) => {
          this.uploadedImage = data.file;
        },
        error: (err) => {
  
        }
      });
    }

}
