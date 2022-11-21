import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-create-park',
  templateUrl: './create-park.component.html',
  styleUrls: ['./create-park.component.css']
})
export class CreateParkComponent implements OnInit {
  fGroup: FormGroup = new FormGroup({});
  
  constructor(
    private fb: FormBuilder,
    private secService: SecurityService,
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
      name:['',[Validators.required,Validators.minLength(5)]],
      details:['',[Validators.required],Validators.maxLength(50)]
    })
  }

  get fg(){
    return this.fGroup.controls;
  }
}
