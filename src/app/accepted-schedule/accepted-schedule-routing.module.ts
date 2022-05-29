import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AcceptedSchedulePage } from './accepted-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: AcceptedSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AcceptedSchedulePageRoutingModule {}
