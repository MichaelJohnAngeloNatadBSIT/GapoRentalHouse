import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleListDetailPage } from './schedule-list-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleListDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleListDetailPageRoutingModule {}
