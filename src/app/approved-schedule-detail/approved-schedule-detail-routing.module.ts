import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ApprovedScheduleDetailPage } from './approved-schedule-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ApprovedScheduleDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApprovedScheduleDetailPageRoutingModule {}
