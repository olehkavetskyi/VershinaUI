import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { AddBrandComponent } from './brand/add-brand/add-brand.component';
import { DeleteBrandComponent } from './brand/delete-brand/delete-brand/delete-brand.component';
import { EditBrandComponent } from './brand/edit-brand/edit-brand.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { AddTypeComponent } from './type/add-type/add-type/add-type.component';
import { DeleteTypeComponent } from './type/delete-type/delete-type/delete-type.component';
import { EditTypeComponent } from './type/edit-type/edit-type/edit-type.component';

const routes: Routes = [
  {path: '', component: AdminPanelComponent}, 
  {path: 'add-brand', component: AddBrandComponent}, 
  {path: 'edit-brand', component: EditBrandComponent}, 
  {path: 'delete-brand', component: DeleteBrandComponent}, 
  {path: 'add-type', component: AddTypeComponent}, 
  {path: 'edit-type', component: EditTypeComponent}, 
  {path: 'delete-type', component: DeleteTypeComponent}, 
  {path: 'add-product', component: AddProductComponent}, 
  {path: 'edit-product', component: EditProductComponent}, 
  {path: 'delete-product', component: DeleteProductComponent}, 
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminPanelRoutingModule { }
