import { NgModule } from '@angular/core';

import { RecapCreateComponent } from './recap-create/recap-create.component';
import { RecapListComponent } from './recap-list/recap-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    RecapCreateComponent,
    RecapListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class RecapsModule {}
