import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CityService } from 'src/app/services/parameters/city.service';

@Component({
  selector: 'app-remove-city',
  templateUrl: './remove-city.component.html',
  styleUrls: ['./remove-city.component.css']
})
export class RemoveCityComponent implements OnInit {
  RolName: string = "";
  constructor(
    private route: ActivatedRoute,
    private CityService:CityService
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }
  SearchRecord() {
    let id = this.route.snapshot.params["_id"];
    this.CityService.getRecorByID(id).subscribe({
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
    this.CityService.removeRecord(id).subscribe({
      next: (data) => {
        alert("Eliminado correctamente");
      },
      error: (err) => {
        alert("Este rol está asociado a un usuario")
      }
    });
  }
}
