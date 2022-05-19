import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewCalendarPage } from './view-calendar.page';

const routes: Routes = [
  {
    path: '',
    component: ViewCalendarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewCalendarPageRoutingModule {}
