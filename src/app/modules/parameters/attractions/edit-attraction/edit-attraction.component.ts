import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApisInfo } from 'src/app/config/apisInfo';
import { ZonaModel } from 'src/app/models/zona.model';
import { ZonaService } from 'src/app/services/parameters/zona.service';
import { AttractionService } from 'src/app/services/parameters/attraction.service';
import { atraccionModel } from 'src/app/models/atraccion.model';


@Component({
  selector: 'app-edit-attraction',
  templateUrl: './edit-attraction.component.html',
  styleUrls: ['./edit-attraction.component.css']
})
export class EditAttractionComponent implements OnInit {
  urlServer: string = ApisInfo.MS_LOG_URL;
  uploadedImage: string = '';//<---------------------
  isFileSelected: boolean = false;//<----------------
  fGroup: FormGroup = new FormGroup({});
  zonas: ZonaModel[]=[];
  nombre:string='';
  constructor(
    private fb: FormBuilder,
    private zonaService: ZonaService,
    private AttractionService: AttractionService,
    private router: Router,
    private route:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.BuildingForm();
    this.SearchRequest();
    this.ListRecords();
  }

  BuildingForm(){
    this.fGroup = this.fb.group({
      id: ['',[]],
      nombre:['',[Validators.required,Validators.minLength(5)]],
      imagen: ['',[Validators.required]],
      min_altura:['',[Validators.required]],
      video:['',[Validators.required]],
      descripcion:['',[Validators.required]],
      zonaId:['',[Validators.required]] 
    })
  }

  SearchRequest(){
    let id = this.route.snapshot.params["id"];
    console.log("ID ",id)
    this.AttractionService.getRecorByID(id).subscribe({
      next: (data)=>{
        this.zonaService.getRecorByID(data.zonaId.toString()).subscribe({
          next: (zona)=>{
            this.fGroup.controls["id"].setValue(data.id);
            this.fGroup.controls["nombre"].setValue(data.nombre);
            this.fGroup.controls["imagen"].setValue(data.image);
            this.fGroup.controls["min_altura"].setValue(data.minimo_altura);
            this.fGroup.controls["video"].setValue(data.video);
            this.fGroup.controls["descripcion"].setValue(data.descripcion);
            this.fGroup.controls["zonaId"].setValue(data.zonaId);
            this.nombre=zona.nombre
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
    this.zonaService.getRecorList().subscribe({
      next: (data) => {
        console.log()
         this.zonas = data;
      },error: (err) => {
       alert("Error obteniendo la información")   
    }
    })
  }

  EditAttractionAction(){
    let id = this.fGroup.controls["id"].value;
    let nombre = this.fGroup.controls["nombre"].value;
    let min_altura = this.fGroup.controls["min_altura"].value;
    let imagen = this.uploadedImage;
    let video = this.fGroup.controls["video"].value;
    let descripcion = this.fGroup.controls["descripcion"].value;
    let zonaId = this.fGroup.controls["zonaId"].value;

    let datos:atraccionModel={
      id: id,
      nombre: nombre,
      image: imagen,
      minimo_altura: min_altura ,
      video: video,
      descripcion: descripcion,
      zonaId: parseInt(zonaId)
    }
    if(this.fGroup.invalid){
      alert("Faltan datos")
    }else{
    this.AttractionService.editRecord(datos).subscribe({
      next:(data) =>{
        if(!data){
          alert('Registro editado con exito')
          this.router.navigate(["/parameters/list-attraction"])
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


  onFileSelect(evt: any) {
    if (evt.target.files.length > 0) {
      const f = evt.target.files[0];
      this.fGroup.controls["imagen"].setValue(f);
      this.isFileSelected = true;
    }
  }

  UploadImage() {
    const formData = new FormData();
    formData.append('file', this.fGroup.controls["imagen"].value);
    this.AttractionService.uploadImage(formData).subscribe({
      next: (data) => {
        this.uploadedImage = data.file;
      },
      error: (err) => {

      }
    });
  }
}
