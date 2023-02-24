import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminPanelService } from 'src/app/admin-panel/admin-panel.service';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent {
  constructor(private adminService: AdminPanelService, private router: Router, private toastr: ToastrService) {}

  addTypeForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  })

  onSubmit() {
    this.adminService.AddType(this.addTypeForm.value.name).subscribe({
      next: () => {
        this.toastr.success("Type created successfully")
        this.router.navigateByUrl('/admin')
      },
      error: (err) => this.toastr.error(err.message)
    })
  }
}
