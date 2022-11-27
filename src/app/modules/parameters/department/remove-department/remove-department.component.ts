import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'src/app/services/parameters/department.service';

@Component({
  selector: 'app-remove-department',
  templateUrl: './remove-department.component.html',
  styleUrls: ['./remove-department.component.css']
})
export class RemoveDepartmentComponent implements OnInit {

  RolName: string = "";
  constructor(
    private route: ActivatedRoute,
    private DepartmentService:DepartmentService
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }

  SearchRecord() {
    let id = this.route.snapshot.params["_id"];
    this.DepartmentService.getRecorByID(id).subscribe({
      next: (data) => {
        this.RolName = data.nombre;
      },
      error: (err) => {
        alert("Error obteniendo el registro")
      }
    })
  }

  RemoveRecord() {
    let id = this.route.snapshot.params["_id"];
    this.DepartmentService.removeRecord(id).subscribe({
      next: (data) => {
        alert("Eliminado correctamente");
      },
      error: (err) => {
        alert("Este rol está asociado a un usuario")
      }
    });
  }
}
