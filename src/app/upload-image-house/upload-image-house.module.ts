import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UploadImageHousePageRoutingModule } from './upload-image-house-routing.module';

import { UploadImageHousePage } from './upload-image-house.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UploadImageHousePageRoutingModule
  ],
  declarations: [UploadImageHousePage]
})
export class UploadImageHousePageModule {}
