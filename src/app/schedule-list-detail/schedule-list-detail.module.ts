import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleListDetailPageRoutingModule } from './schedule-list-detail-routing.module';

import { ScheduleListDetailPage } from './schedule-list-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleListDetailPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ScheduleListDetailPage]
})
export class ScheduleListDetailPageModule {}
