import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PendingSchedulePageRoutingModule } from './pending-schedule-routing.module';

import { PendingSchedulePage } from './pending-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PendingSchedulePageRoutingModule
  ],
  declarations: [PendingSchedulePage]
})
export class PendingSchedulePageModule {}
