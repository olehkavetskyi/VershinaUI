import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Brand, IBrand } from '../shared/models/brand';
import { Product } from '../shared/models/product';
import { Type } from '../shared/models/productType';
@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {
  baseUrl = environment.apiUrl
  cuid: string = cuid();
  newBrand = new Brand();
  newType = new Type();
  constructor(private http: HttpClient) { }

  addBrand(name: string) {
    this.newBrand.name = name;

    return this.http.post<string>(this.baseUrl + 'products/add-brand', this.newBrand)
  }

  editBrand( brand: Brand) {
    return this.http.put<Brand>(this.baseUrl + 'products/edit-brand', brand);
  }

  AddType(name: string) {
    this.newType.name = name;

    return this.http.post<string>(this.baseUrl + 'products/add-type', this.newType)
  }

  AddProduct(values: any) {
    //return this.http.post<Product>(this.baseUrl + 'products/add-product', values)
    return this.http.post<any>(this.baseUrl + 'products/add-product', values);
  }

  onUpload(selectedFile: File) {
    const formData = new FormData();
    formData.append('file', selectedFile);

    this.http.post('/api/upload', formData).subscribe(
      res => console.log('Image uploaded'),
      err => console.log('Error uploading image', err)
    );
  }

  GetBrand(id: string) {
    return this.http.get<Brand>(this.baseUrl + 'products/brand' + id);
  }

  GetType(id: string) {
    return this.http.get<Type>(this.baseUrl + 'products/type' + id);
  }
}