import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlansService } from 'src/app/services/parameters/plans.service';

@Component({
  selector: 'app-remove-plan',
  templateUrl: './remove-plan.component.html',
  styleUrls: ['./remove-plan.component.css']
})
export class RemovePlanComponent implements OnInit {
  RolName: string = "";
  constructor(
    private route: ActivatedRoute,
    private PlanService:PlansService
  ) { }

  ngOnInit(): void {
    this.SearchRecord();
  }
  SearchRecord() {
    let id = this.route.snapshot.params["_id"];
    this.PlanService.getRecorByID(id).subscribe({
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
    this.PlanService.removeRecord(id).subscribe({
      next: (data) => {
        alert("Eliminado correctamente");
      },
      error: (err) => {
        alert("Este rol está asociado a un usuario")
      }
    });
  }
}
