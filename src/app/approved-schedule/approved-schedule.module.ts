import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ApprovedSchedulePageRoutingModule } from './approved-schedule-routing.module';

import { ApprovedSchedulePage } from './approved-schedule.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ApprovedSchedulePageRoutingModule
  ],
  declarations: [ApprovedSchedulePage]
})
export class ApprovedSchedulePageModule {}
