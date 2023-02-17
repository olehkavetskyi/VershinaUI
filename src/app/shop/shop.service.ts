import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBrand } from '../shared/models/brand';
import { IPagination } from '../shared/models/pagination';
import { IProduct, Product } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = environment.apiUrl;
  products: Product[] = [];
  brands: IBrand[] = [];
  types: IType[] = [];
  productCache = new Map();
  pagination?: IPagination<Product[]>;
  shopParams = new ShopParams();


  constructor(private http: HttpClient) { }

  setShopParams(params: ShopParams) {
    this.shopParams = params;
  }

  getShopParams() {
    return this.shopParams;
  }

  getProducts(useCache = true) {

    if (!useCache) {
      this.productCache = new Map<string, IPagination<Product[]>>();
    }

    if (this.productCache.size > 0 && useCache) {
      if (this.productCache.has(Object.values(this.shopParams).join('-'))) {
        this.pagination = this.productCache.get(Object.values(this.shopParams).join('-'))
        
        if (this.pagination)
          return of(this.pagination);
      }
    }

    let params = new HttpParams();

    if (this.shopParams.brandId !== '') {
      params = params.append('brandId', this.shopParams.brandId.toString());
    }

    if (this.shopParams.typeId !== '') {
      params = params.append('typeId', this.shopParams.typeId.toString())
    }

    if (this.shopParams.search) {
      params = params.append('search', this.shopParams.search);
    }

      params = params.append('sort', this.shopParams.sort);
      params = params.append('pageIndex', this.shopParams.pageNumber.toString());
      params = params.append('pageIndex', this.shopParams.pageSize.toString());
      
    return this.http.get<IPagination<Product[]>>(this.baseUrl + 'products', {params})
      .pipe(
        map(response => {
          this.productCache.set(Object.values(this.shopParams).join('-'), response)
          this.pagination = response;
          return response;
        })
      );
  }

  getProduct(id: string) {
    const product = [...this.productCache.values()]
      .reduce((acc, paginatedResult) => {
        return {...acc, ...paginatedResult.data.find(x => x.id === id)}
      }, {} as Product)

      if (Object.keys(product).length !== 0)
        return of(product);

    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }

  getBrands() {
    if (this.brands.length > 0)
      return of(this.brands);

    return this.http.get<IBrand[]>(this.baseUrl + 'products/brands').pipe(
      map(brands => this.brands = brands)
    )
  }

  getTypes() {
    if (this.types.length > 0)
      return of(this.types);

    return this.http.get<IType[]>(this.baseUrl + 'products/types').pipe(
      map(types => this.types = types)
    )
  }
}
