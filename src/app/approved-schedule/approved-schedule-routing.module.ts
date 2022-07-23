import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovedSchedulePage } from './approved-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovedSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovedSchedulePageRoutingModule {}
