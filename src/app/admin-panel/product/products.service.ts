import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { IPagination } from 'src/app/shared/models/pagination';
import { ShopParams } from 'src/app/shared/models/shopParams';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  AddProduct(values: any) {
    return this.http.post<any>(this.baseUrl + 'products/add-product', values);
  }

  deleteProduct(id: string) {
    return this.http.delete(this.baseUrl + 'products/delete-product/' + id);
  }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    if (shopParams.brandId !== '') {
      params = params.append('brandId', shopParams.brandId.toString());
    }
    if (shopParams.typeId !== '') {
      params = params.append('typeId', shopParams.typeId.toString())
    }

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber.toString());
    params = params.append('pageIndex', shopParams.pageSize.toString());
      
    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params})
      .pipe(
        map(response => response.body)
      );
  }


  onUpload(selectedFile: File) {
    const formData = new FormData();
    formData.append('file', selectedFile);

    this.http.post('/api/upload', formData).subscribe({
      next: () => console.log('Image uploaded'),
      error: err => console.log('Error uploading image', err)
    });
  }
}
