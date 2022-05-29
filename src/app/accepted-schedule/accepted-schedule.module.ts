import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcceptedSchedulePageRoutingModule } from './accepted-schedule-routing.module';

import { AcceptedSchedulePage } from './accepted-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcceptedSchedulePageRoutingModule
  ],
  declarations: [AcceptedSchedulePage]
})
export class AcceptedSchedulePageModule {}
