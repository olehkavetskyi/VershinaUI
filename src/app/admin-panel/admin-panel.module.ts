import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { AddBrandComponent } from './brand/add-brand/add-brand.component';
import { EditBrandComponent } from './brand/edit-brand/edit-brand.component';
import { DeleteBrandComponent } from './brand/delete-brand/delete-brand/delete-brand.component';
import { AddProductComponent } from './product/add-product/add-product.component';
import { AddTypeComponent } from './type/add-type/add-type/add-type.component';
import { EditProductComponent } from './product/edit-product/edit-product.component';
import { DeleteProductComponent } from './product/delete-product/delete-product.component';
import { EditTypeComponent } from './type/edit-type/edit-type/edit-type.component';
import { DeleteTypeComponent } from './type/delete-type/delete-type/delete-type.component';
import { SharedModule } from "../shared/shared.module";
import { FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
        AddBrandComponent,
        EditBrandComponent,
        DeleteBrandComponent,
        AddProductComponent,
        EditProductComponent,
        DeleteProductComponent,
        AddTypeComponent,
        EditTypeComponent,
        DeleteTypeComponent
    ],
    imports: [
        CommonModule,
        AdminPanelRoutingModule,
        SharedModule, 
        FormsModule
    ]
})
export class AdminPanelModule { }
