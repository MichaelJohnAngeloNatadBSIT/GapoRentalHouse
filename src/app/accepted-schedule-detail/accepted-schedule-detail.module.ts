import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptedScheduleDetailPageRoutingModule } from './accepted-schedule-detail-routing.module';

import { AcceptedScheduleDetailPage } from './accepted-schedule-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcceptedScheduleDetailPageRoutingModule
  ],
  declarations: [AcceptedScheduleDetailPage]
})
export class AcceptedScheduleDetailPageModule {}
