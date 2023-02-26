import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as cuid from 'cuid';
import { Type } from 'src/app/shared/models/productType';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  baseUrl = environment.apiUrl
  cuid: string = cuid();
  newType = new Type();
  constructor(private http: HttpClient) { }

  
  addType(name: string) {
    this.newType.name = name;

    return this.http.post<string>(this.baseUrl + 'products/add-type', this.newType)
  }

  deleteType(type: any) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: {
        id: type.id,
        name: type.name
      }
    };
    return this.http.delete(this.baseUrl + 'products/delete-type', httpOptions);
  }

  getType(id: string) {
    return this.http.get<Type>(this.baseUrl + 'products/type' + id);
  }

  editType(type: Type) {
    return this.http.put<Type>(this.baseUrl + 'products/edit-type', type);
  }
}
