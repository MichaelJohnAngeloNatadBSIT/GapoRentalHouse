import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostedHousePageRoutingModule } from './posted-house-routing.module';

import { PostedHousePage } from './posted-house.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostedHousePageRoutingModule
  ],
  declarations: [PostedHousePage]
})
export class PostedHousePageModule {}
