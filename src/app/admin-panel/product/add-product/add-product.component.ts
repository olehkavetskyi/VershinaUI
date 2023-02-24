import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/shared/models/brand';
import { Type } from 'src/app/shared/models/productType';
import { ShopService } from 'src/app/shop/shop.service';
import { AdminPanelService } from '../../admin-panel.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
   brands: Brand[] = [];
   types: Type[] = [];

    productForm: FormGroup;
    selectedFile: File;
  
    constructor(private fb: FormBuilder, private http: HttpClient,
       private shopService: ShopService, private adminService: AdminPanelService,
       private toastr: ToastrService) {

    }

    ngOnInit(): void {
      this.productForm = this.fb.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        price: ['', Validators.required],
        type: ['', Validators.required],
        brand: ['', Validators.required]
      });

      this.shopService.getBrands().subscribe({
        next: (result) => {
      this.brands = result
        }
      })
      this.shopService.getTypes().subscribe({
        next: (result) => {
          this.types = result;
        }
      });
    }
  
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
    }
  
    onSubmit() {
      const formData = new FormData();
      formData.append('name', this.productForm.get('name').value);
      formData.append('description', this.productForm.get('description').value);
      formData.append('price', this.productForm.get('price').value);
      formData.append('picture', this.selectedFile, this.selectedFile.name);
      formData.append('productTypeId', this.productForm.get('type').value);
      formData.append('productBrandId', this.productForm.get('brand').value);


      this.adminService.AddProduct(formData).subscribe({
        next: () => this.toastr.success('Product added successfully'),
        error: error => this.toastr.error(error.message)
      })
    }
  }

