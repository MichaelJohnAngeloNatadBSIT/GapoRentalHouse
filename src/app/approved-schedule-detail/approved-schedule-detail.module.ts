import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovedScheduleDetailPageRoutingModule } from './approved-schedule-detail-routing.module';

import { ApprovedScheduleDetailPage } from './approved-schedule-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ApprovedScheduleDetailPageRoutingModule
  ],
  declarations: [ApprovedScheduleDetailPage]
})
export class ApprovedScheduleDetailPageModule {}
