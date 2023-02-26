import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Type } from 'src/app/shared/models/productType';
import { TypesService } from '../types.service';

@Component({
  selector: 'app-edit-type',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.scss']
})
export class EditTypeComponent implements OnInit {
  type?: Type;

  constructor(private typesService: TypesService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation().extras?.state as Type; 
    this.type = navigation; 
    this.typeForm.controls['name'].setValue(this.type?.name);
  }

  typeForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  onSubmit() {
    this.typesService.addType(this.typeForm.value.name).subscribe({
      next: () => {
        this.toastr.success("Type edited successfully")
        this.router.navigateByUrl('/admin/types')
      },
      error: (err) => this.toastr.error(err.message)
    })
  }
}
