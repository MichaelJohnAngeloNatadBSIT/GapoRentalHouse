import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScheduleVisitPage } from './schedule-visit.page';

const routes: Routes = [
  {
    path: '',
    component: ScheduleVisitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScheduleVisitPageRoutingModule {}
