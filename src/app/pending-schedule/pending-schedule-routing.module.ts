import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PendingSchedulePage } from './pending-schedule.page';

const routes: Routes = [
  {
    path: '',
    component: PendingSchedulePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PendingSchedulePageRoutingModule {}
