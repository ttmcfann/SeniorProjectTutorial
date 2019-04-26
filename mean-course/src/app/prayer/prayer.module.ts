import { NgModule } from '@angular/core';

import { ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrayerCreateComponent } from './prayer-create/prayer-create.component';
import { PrayerListComponent } from './prayer-list/prayer-list.component';



@NgModule({
  declarations: [
    PrayerCreateComponent,
    PrayerListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    RouterModule
  ]
})
export class PrayerModule {}
