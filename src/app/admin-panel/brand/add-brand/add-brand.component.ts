import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminPanelService } from '../../admin-panel.service';

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.scss']
})
export class AddBrandComponent {

  constructor(private adminService: AdminPanelService, private router: Router, private toastr: ToastrService) {}

  addBrandForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  onSubmit() {
    this.adminService.addBrand(this.addBrandForm.value.name).subscribe({
      next: () => {
        this.toastr.success("Brand created successfully")
        this.router.navigateByUrl('/admin')
      },
      error: (err) => this.toastr.error(err.message)
    })
  }
}
