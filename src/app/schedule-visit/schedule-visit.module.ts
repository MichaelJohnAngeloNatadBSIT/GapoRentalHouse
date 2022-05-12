import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScheduleVisitPageRoutingModule } from './schedule-visit-routing.module';

import { ScheduleVisitPage } from './schedule-visit.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScheduleVisitPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ScheduleVisitPage]
})
export class ScheduleVisitPageModule {}
